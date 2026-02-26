import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { queryAI } from "../../api/openai";
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
      try {
        const res = await fetch("http://localhost:5000/api", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({answers: props.allAnswers})
        }); 
        //queryAI(props.allAnswers) as RecommendationData[];
        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }
        const data = await res.json() as RecommendationData[];
        setMovieData(data);
      }
      catch (err) {
        throw new Error("Error fetching recommendations");
      }
    }
    fetchRecs();
  }, []);

  /*
  useEffect(() => {
    if (movieData) {
      console.log(movieData);
    }
  }, [movieData])
  */

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