-- Create table in supabase
create table movie_recommendations (
  id serial primary key,
  title text,
  release_year int,
  content text,
  embedding vector(1536)
)

-- Turn on security
alter table "movie_recommendations"
enable row level security

-- Allow anonymous access
create policy "Allow public access"
  on movie_recommendations
  for select 
  to anon
  using (true);

-- Add constraint
alter table "movie_recommendations"
add constraint titles_year_unique unique (title, release_year)

-- Create function to search for movies
create or replace function search_movies (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table(
  id bigint,
  content text,
  similarity float
)
language sql stable
as $$
  select
    movie_recommendations.id,
    movie_recommendations.content, 
    1 - (movie_recommendations.embedding <=> query_embedding) as similarity
  from movie_recommendations
  where 1 - (movie_recommendations.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;