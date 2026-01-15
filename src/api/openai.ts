import dedent from 'dedent';
import { openai, supabase } from '../utils/config'
import type { PersonQuizAnswers, SupabaseSearchObject } from '../utils/types';
import { getMoviePoster } from './getMoviePoster';

export async function queryAI(prompts: PersonQuizAnswers[]) {
  const finalPrompt = prompts.map((item) => generatePrompt(item)).join('.')

  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: finalPrompt,
    });

    const answerEmbedding = response.data[0].embedding;

    const { data, error } = await supabase.rpc('search_movies', {
      query_embedding: answerEmbedding,
      match_threshold: 0.2,
      match_count: 3
    });
    if (error) {
      throw new Error('error running supabase function')
    }
    const movieList = await Promise.all(
      data.map(async (item: SupabaseSearchObject) => {
      const url = await getMoviePoster(item.title)
      return {
        title: item.title,
        year: item.release_year,
        description: item.content.split('):')[1],
        poster: url,
      }
    }));
    return movieList;
  } catch (error) {
    console.log(error)
  }

}

function generatePrompt(answers: PersonQuizAnswers) {
  return dedent`Person ${answers.person} would like to watch a movie that has\
    most, if not all, of the following qualities: 
    release era: \
    ${answers.isNew ? 'new ' : ''} \
    ${answers.isClassic ? 'classic ' : ''} 
    mood: \
    ${answers.isFun ? 'fun ' : ''}\
    ${answers.isSerious ? 'serious ' : ''}\
    ${answers.isInspiring ? 'inspiring ' : ''}\
    ${answers.isScary ? 'scary' : ''}
    Take into account their favorite movie is "${answers.favorite}"
    and if they were stranded on an island they would want to be with "${answers.island}" 
  `
}