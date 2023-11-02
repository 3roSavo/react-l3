import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./assets/logo.png";
import Preferiti from "./components/Preferiti";
import DaRivedere from "./components/DaRivedere";
import Cult from "./components/Cult";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TVShows from "./components/TVShows";
import MovieDetails from "./components/MovieDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      {/* ------------------------------------------------------------------------------------------navbar qui -------------------------------------- */}

      <BrowserRouter>
        <Navbar NetflixLogo={logo} />

        <div className="container-fluid px-4">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <h2 className="mb-4">TV Shows</h2>
              <div className="btn-group" role="group">
                <div className="dropdown ms-4 mt-1">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm dropdown-toggle rounded-0"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ backgroundColor: "#221f1f" }}
                  >
                    Genres
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Comedy
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Drama
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Thriller
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <i className="bi bi-grid icons"></i>
              <i className="bi bi-grid-3x3 icons"></i>
            </div>
          </div>

          {/* Qui inserirò le 3 sezioni di film -------------------------------------------------------------------------*/}
          <Routes>
            <Route
              element={
                <div>
                  <Preferiti />
                  <DaRivedere />
                  <Cult />
                </div>
              }
              path="/"
            />
            <Route element={<TVShows />} path="/tv-shows" />
            <Route element={<MovieDetails />} path="/movie-details/:movieId" />
          </Routes>
          {/* Qui inserirò il footer ------------------------------------------------------------------------------------*/}

          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
