import * as React from "react";
import ReactDOM from "react-dom";
import serialInputExample from "./serial-input-example";

ReactDOM.render(
  <div
    style={{
      width: "400px",
      position: "fixed",
      left: "50%",
      top: "40%",
      transform: "translate(-50%, -50%)"
    }}
  >
    {serialInputExample}
  </div>,
  document.getElementById("main")
);
