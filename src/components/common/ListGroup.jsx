import React from "react";

const ListGroup = ({
  genres,
  currentGenre,
  textProperty,
  valueProperty,
  onSelectGenre
}) => {
  return (
    <ul className="list-group">
      {genres.map(genre => (
        <li
          key={genre[valueProperty]}
          onClick={() => onSelectGenre(genre)}
          className={
            genre === currentGenre
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
