import { Button } from "react-bootstrap";

const SingleComment = ({ comment, fetchComments }) => {
  const deleteComment = () => {
    fetch(
      "https://striveschool-api.herokuapp.com/api/comments/" + comment._id,
      {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQzZDZjOWI0MDZiZTAwMTRiN2I3NmYiLCJpYXQiOjE2OTg5NDQ3MTQsImV4cCI6MTcwMDE1NDMxNH0.8m93xXeEecJjxBb08tgpKYih4BLp3kpcXTo5a78dxUQ",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("recensione eliminata con successo");
          fetchComments();
        } else {
          throw new Error("Errore nel recupero dei film");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <strong>{comment.author}</strong> dice:
      </div>
      <i>"{comment.comment}"</i>
      <div>
        Valutazione : <strong>{comment.rate}</strong>
      </div>
      <div className="text-end ">
        <Button
          variant="danger"
          className="p-1 me-2 mb-2"
          onClick={() => deleteComment()}
        >
          Elimina
        </Button>
      </div>
    </>
  );
};
export default SingleComment;
