import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";

const MovieDetails = () => {
  const params = useParams();
  const idFilm = params.movieId;
  console.log(idFilm);

  const [movieInfo, setMovieInfo] = useState(0);

  const getMyCult = () => {
    fetch("http://www.omdbapi.com/?apikey=846ed30e&&i=" + idFilm)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel recupero dei film");
        }
      })
      .then((obj) => {
        console.log(obj);
        setMovieInfo(obj);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMyCult();
  }, []);

  return (
    <Card className="mx-auto w-25">
      <Card.Img variant="top" src={movieInfo.Poster} />
      <Card.Body>
        <Card.Title>{movieInfo.Title}</Card.Title>
        <Card.Text>Anno : {movieInfo.Year}</Card.Text>
        <Card.Text>Genere : {movieInfo.Genre}</Card.Text>
        <Card.Text>Nazione : {movieInfo.Country}</Card.Text>
        <Card.Text>Incasso : {movieInfo.BoxOffice}</Card.Text>
      </Card.Body>
    </Card>
  );
};
export default MovieDetails;
