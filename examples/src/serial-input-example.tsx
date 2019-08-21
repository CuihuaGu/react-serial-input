import * as React from "react";
import SerialInput from "../../src/index";

const serialInputExample = (
  <SerialInput
    label="Serial Input Example:"
    inputs={[
      {
        length: 4,
        glueChar: "-",
        maxInput: 4,
        defaultValue: "AB3D"
      },
      {
        length: 4,
        glueChar: "-",
        maxInput: 4,
        defaultValue: "4728"
      },
      {
        length: 4,
        glueChar: "-",
        maxInput: 4,
        defaultValue: "SJDH"
      },
      {
        length: 4,
        maxInput: 4,
        defaultValue: "3H84"
      }
    ]}
    error={false}
  />
);

export default serialInputExample;
