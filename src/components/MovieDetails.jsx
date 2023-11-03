import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import SingleComment from "./SingleComment";
import AddComment from "./AddComment";

const MovieDetails = () => {
  const params = useParams();
  const idFilm = params.movieId;
  console.log(idFilm);

  const [movieInfo, setMovieInfo] = useState("");
  const [comments, setComments] = useState([]);

  const getFilmsSelected = () => {
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

  const getComments = () => {
    fetch("https://striveschool-api.herokuapp.com/api/comments/" + idFilm, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQzZDZjOWI0MDZiZTAwMTRiN2I3NmYiLCJpYXQiOjE2OTg5NDQ3MTQsImV4cCI6MTcwMDE1NDMxNH0.8m93xXeEecJjxBb08tgpKYih4BLp3kpcXTo5a78dxUQ",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel recupero dei film");
        }
      })
      .then((obj) => {
        console.log(obj);
        setComments(obj);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFilmsSelected();
    getComments();
  }, []);

  return (
    <Row className="justify-content-center">
      <Col xs={8} sm={6} md={4} lg={3}>
        <Card className="mx-auto bg-transparent text-light border-light shadow-lg">
          <Card.Img
            style={{ maxHeight: "350px" }}
            variant="top"
            src={movieInfo.Poster}
          />
          <Card.Body>
            <Card.Title>{movieInfo.Title}</Card.Title>
            <Card.Text>Anno : {movieInfo.Year}</Card.Text>
            <Card.Text>Genere : {movieInfo.Genre}</Card.Text>
            <Card.Text>Nazione : {movieInfo.Country}</Card.Text>
            <Card.Text>Incasso : {movieInfo.BoxOffice}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col className="text-center" xs={12} sm={6} md={4} lg={3}>
        <h5 className="text-light mb-3">COMMENTI</h5>
        {comments.map((comment) => {
          return (
            <div
              className="bg-light opacity-50 rounded-4 p-1 mb-2"
              key={comment._id}
            >
              <SingleComment comment={comment} fetchComments={getComments} />
            </div>
          );
        })}
        <AddComment id={idFilm} fetchComments={getComments} />
      </Col>
    </Row>
  );
};
export default MovieDetails;
