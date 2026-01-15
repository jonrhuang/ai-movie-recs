export async function getMoviePoster(movieTitle: string) {
  try {
    const baseUrl = await getBaseUrl();
    const fileSize = await getFileSize();
    const posterPath = await getMoviePosterPath(movieTitle);

    return baseUrl+fileSize[3]+posterPath
  } catch (err) {
    console.error(err)
  }


}

async function getBaseUrl() {
  try {
    const url = 'https://api.themoviedb.org/3/configuration';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNWI2MjYxYzIxY2VjNGFjNDM3YjM0MmE0NmZiNzRjZSIsIm5iZiI6MTc2ODM1Mzk4My42OTkwMDAxLCJzdWIiOiI2OTY2ZjBiZjk1NTQ4YmVjODQ2ODcxZTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.JnSKcsu_ma8vOGWisZdgXsb56kzOyjkaj7aP5QNnph4'
      }
    };

    const data = await fetch(url, options)
      .then(res => res.json());

    return data.images.base_url;
  } catch {
    throw new Error('Error getting base url')
  }
}

async function getFileSize() {
  try {
    const url = 'https://api.themoviedb.org/3/configuration';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNWI2MjYxYzIxY2VjNGFjNDM3YjM0MmE0NmZiNzRjZSIsIm5iZiI6MTc2ODM1Mzk4My42OTkwMDAxLCJzdWIiOiI2OTY2ZjBiZjk1NTQ4YmVjODQ2ODcxZTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.JnSKcsu_ma8vOGWisZdgXsb56kzOyjkaj7aP5QNnph4'
      }
    };

    const data = await fetch(url, options)
      .then(res => res.json());

    return data.images.poster_sizes;
  } catch {
    throw new Error('Error getting base url')
  }
}

async function getMoviePosterPath(movieTitle: string) {
  const encodedTitle = encodeURIComponent(movieTitle);
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodedTitle}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.results[0].poster_path;
  } catch {
    throw new Error('Error fetching poster path')
  }
}