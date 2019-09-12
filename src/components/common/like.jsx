import React from "react";

const Like = props => {
  const classes = "fa fa-heart" + (props.liked ? "" : "-o");

  return (
    <i className={classes} aria-hidden="true" onClick={props.onLikeToggle} />
  );
};

export default Like;
