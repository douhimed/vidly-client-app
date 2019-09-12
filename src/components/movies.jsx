import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import ListGroup from "./common/ListGroup";
import { paginate } from "../utils/pagination";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    currentGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  deleteMovieHandler = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  likeMovieHandler = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  pageChangeHandler = page => {
    this.setState({ currentPage: page });
  };

  selectedGenreHandler = genre => {
    this.setState({ currentGenre: genre, currentPage: 1 });
  };

  sortHandler = sortColumn => {
    this.setState({ sortColumn: sortColumn });
  };

  getPagedMovies = () => {
    const {
      pageSize,
      currentPage,
      movies: fullMoviesList,
      currentGenre,
      sortColumn
    } = this.state;

    const filtredMovies =
      currentGenre && currentGenre._id
        ? fullMoviesList.filter(movie => movie.genre._id === currentGenre._id)
        : fullMoviesList;

    const sortedMovies = _.orderBy(
      filtredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: filtredMovies.length, data: movies };
  };

  render() {
    let { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      genres,
      currentGenre,
      sortColumn
    } = this.state;

    if (count === 0) return <p>There are no movies in the database</p>;

    const { totalCount, data: movies } = this.getPagedMovies();

    return (
      <div className="row">
        <div className="col-4">
          <ListGroup
            genres={genres}
            currentGenre={currentGenre}
            onSelectGenre={this.selectedGenreHandler}
          />
        </div>
        <div className="col">
          <p>There are {totalCount} movies available</p>
          <MoviesTable
            onLike={this.likeMovieHandler}
            sortColumn={sortColumn}
            onDelete={this.deleteMovieHandler}
            movies={movies}
            onSort={this.sortHandler}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.pageChangeHandler}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
