import React from "react";
import "./App.css";
import Movies from "./components/movies";
import Customers from "./components/customers";
import MovieForm from "./components/movieForm";
import NotFound from "./components/notFound";
import Rentals from "./components/rentals";
import NavBar from "./components/navbar";
import { Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/movies/:id" component={MovieForm} />

          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/notFound" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
