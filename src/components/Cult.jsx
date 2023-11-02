/* eslint-disable jsx-a11y/img-redundant-alt */
import { Component } from "react";
import { Spinner, Alert } from "react-bootstrap";

class Cult extends Component {
  state = {
    cult: null,
    isLoading: true,
    isError: false,
  };

  getMyCult = () => {
    fetch("http://www.omdbapi.com/?apikey=846ed30e&s=back%20to%20the%20future")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel recupero dei film");
        }
      })
      .then((obj) => {
        console.log(obj);
        this.setState({
          cult: obj,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
          isError: true,
        });
      });
  };
  componentDidMount() {
    this.getMyCult();
  }

  render() {
    return (
      <>
        <h4>Cult</h4>
        {this.state.isLoading && (
          <div className="text-center">
            <Spinner animation="border" variant="danger" />
          </div>
        )}
        {this.state.isError && (
          <div>
            <Alert variant="danger" className="text-center bg-danger">
              Errore nel caricamento dei film
            </Alert>
          </div>
        )}
        {this.state.cult && (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-6 mb-4">
            {this.state.cult.Search.map((movie) => {
              return (
                <div className="col mb-2 text-center px-1" key={movie.imdbID}>
                  <img
                    className="img-fluid"
                    src={movie.Poster}
                    alt="movie picture"
                  />
                  <h6 className="text-light">{movie.Title}</h6>
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  }
}
export default Cult;
