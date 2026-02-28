import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { PersonQuizAnswers, RecommendationData } from "../../utils/types";
import styles from './Results.module.css';

type ResultsProps = {
  allAnswers: PersonQuizAnswers[];
}

export function Results(props: ResultsProps) {
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState<RecommendationData[] | null>(null);
  const [recNum, setRecNum] = useState(0);

  // Get recommendation when result page loads
  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const res = await fetch("http://localhost:5000/recommend", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({answers: props.allAnswers})
        }); 

        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }
        const { recommendation } = await res.json();
        setMovieData(recommendation as RecommendationData[]);
      }
      catch (err) {
        throw new Error("Error fetching recommendations");
      }
    }
    fetchRecs();
  }, []);

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

      <button 
        className={styles.nextButton}
        onClick={handleClick}
      >
        {recNum < 2 ? 'Next Movie' : 'Start Over'}
      </button>
    </>
  )
}

export default Results;