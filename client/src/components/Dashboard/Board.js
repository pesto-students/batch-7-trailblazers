import React, { Fragment } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

export default function Board(props) {
  return (
    <Fragment>
      <Card
        style={{ backgroundColor: props.backgroundColor }}
        className={"board" + (props.className ? props.className : "")}
        onClick={props.afterClick}
      >
        <CardContent>{props.children}</CardContent>
        {props.showAction ? (
          <CardActions style={{ justifyContent: "center" }}>
            <Button size="small">View Board</Button>
          </CardActions>
        ) : (
          ""
        )}
      </Card>
    </Fragment>
  );
}
