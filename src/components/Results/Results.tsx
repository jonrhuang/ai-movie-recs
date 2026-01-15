import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { queryAI } from "../../api/openai";
import type { PersonQuizAnswers, RecommendationData } from "../../utils/types";

type ResultsProps = {
  allAnswers: PersonQuizAnswers[];
}

export function Results(props: ResultsProps) {
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState<RecommendationData[] | null>(null);
  const [recNum, setRecNum] = useState(0);

  useEffect(() => {
    const fetchRecs = async () => {
      const data  = await queryAI(props.allAnswers) as RecommendationData[];
      setMovieData(data);
    }
    fetchRecs();
  }, []);

  useEffect(() => {
    if (movieData) {
      console.log(movieData);
    }
  }, [movieData])

  const title = movieData && movieData[recNum] &&
    <h2>{movieData[recNum].title} ({movieData[recNum].year})</h2>;

  const description = movieData && movieData[recNum] &&
    <p>{movieData[recNum].description}</p>;

  function handleClick() {
    if (recNum === 2) {
      navigate('/');
    } 
    else {
      setRecNum(prev => prev + 1);
    }
  }
  
  return (
    <>
      {!movieData && <p>Loading...</p>}

      {title}

      {movieData && movieData[recNum] &&
        <img src={movieData[recNum].poster} />
      }

      {description}

      <button onClick={handleClick}>
        {recNum < 2 ? 'Next Movie' : 'Start Over'}
      </button>
    </>
  )
}

export default Results;