import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddComment = ({ id, fetchComments }) => {
  const [comment, setComment] = useState({
    comment: "",
    rate: "1",
    elementId: id,
  });

  useEffect(() => {
    setComment({
      ...comment,
      elementId: id,
    });
  }, [id]);

  const AddComment = (e) => {
    e.preventDefault();
    fetch("https://striveschool-api.herokuapp.com/api/comments/", {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQzZDZjOWI0MDZiZTAwMTRiN2I3NmYiLCJpYXQiOjE2OTg5NDQ3MTQsImV4cCI6MTcwMDE1NDMxNH0.8m93xXeEecJjxBb08tgpKYih4BLp3kpcXTo5a78dxUQ",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Recensione inviata!");
          setComment({
            comment: "",
            rate: 1,
            elementId: id,
          });
          fetchComments();
        } else {
          throw new Error("Errore nel recupero dei film");
        }
      })
      .then((obj) => {
        console.log(obj);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="text-light mt-3 mb-1">Lascia qui il tuo commento!</div>
      <Form onSubmit={AddComment} className="text-light">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Scrivi qui!"
            value={comment.comment}
            onChange={(e) =>
              setComment({
                ...comment,
                comment: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Label>Valutazione :</Form.Label>
        <Form.Select
          value={comment.rate}
          onChange={(e) =>
            setComment({
              ...comment,
              rate: e.target.value,
            })
          }
          aria-label="Default select example"
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Select>
        <Button type="submit" className="mt-3" variant="primary">
          Invia!
        </Button>
      </Form>
    </>
  );
};
export default AddComment;
