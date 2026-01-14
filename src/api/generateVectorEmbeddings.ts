import { openai, supabase } from '../utils/config'
import movieData from '../db/movieInfo'

export async function generateVectorEmbeddings() {
  const data = await Promise.all(
    movieData.map(async movie => {
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: movie.content
      });

      return {
        ...movie,
        embedding: embeddingResponse.data[0].embedding
      }

    })
  );
  const { error } = await supabase.from('movie_recommendations').upsert(data, {
    onConflict: 'title,release_year',
    ignoreDuplicates: true,
  });
  if (error) console.log(error)
  console.log("task completed");
}