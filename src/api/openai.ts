import { openai } from '../utils/config'
import type { PersonQuizAnswers } from '../utils/types';

export async function queryAI(prompts: PersonQuizAnswers[]) {
  const finalPrompt = prompts.map((item) => generatePrompt(item)).join('.')

}

function generatePrompt(answers: PersonQuizAnswers) {
  return `Person ${answers.person} would like to watch a movie that has \
    most, if not all, of the following qualities:
    ${answers.isNew && "new age"} \
    ${answers.isClassic && "classic age"} \
    ${answers.isFun && "fun mood, "} \
    ${answers.isSerious && "serious mood, "} \
    ${answers.isInspiring && "scary mood, "} \
    ${answers.isScary && "mood"}. \
    Take into account their favorite movie is ${answers.favorite} \
    and if they were stranded on an island they would want to be with ${answers.island}
  `
}