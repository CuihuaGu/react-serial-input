import * as React from "react";

export type InputConfig = {
  length?: number;
  maxInput?: number;
  glueChar?: string;
  trimRegex?: RegExp;
  defaultValue?: string;
  placeholder?: string;
};

export interface Props {
  label?: string;
  labelClassName?: any;
  inputClassName?: any;
  inputs: InputConfig[];
  error?: boolean;
  onChange?: (value: string) => void;
}

export interface State {
  inputData: string[];
}

export default class SerialInput extends React.Component<Props, State> {
  refList: React.RefObject<HTMLInputElement>[];

  constructor(props: Props) {
    super(props);
    this.state = {
      inputData: props.inputs.map(({ defaultValue = "" }) => {
        return defaultValue;
      })
    };

    this.refList = props.inputs.map(_i => {
      return React.createRef<HTMLInputElement>();
    });
  }

  joinInputs = (inputData: string[]) => {
    if (inputData.findIndex(i => i !== "") === -1) {
      return "";
    }

    const { inputs } = this.props;
    let joined = "";
    inputs.forEach(({ glueChar }, index) => {
      joined =
        joined + inputData[index] + (glueChar === undefined ? "" : glueChar);
    });

    return joined;
  };

  jumpByStep = (index: number, step: number) => {
    const length = this.props.inputs.length;
    const to = index + step;

    if (to > length - 1 || to < 0) return;
    this.refList[to].current.focus();
  };
  onInputChange = (e: any) => {
    const index = parseInt(e.currentTarget.getAttribute("data-index"));
    const value = e.currentTarget.value;
    this.setInputValue(index, value);
  };

  setInputValue = (index: number, value: string) => {
    const { inputs } = this.props;
    const { inputData } = this.state;
    if (index >= inputs.length || index < 0) return;

    const { maxInput = 10000000, length, glueChar, trimRegex } = inputs[index];

    const glueIndex = value.indexOf(glueChar);
    if (glueIndex !== -1) {
      inputData[index] = value.slice(0, glueIndex).slice(0, maxInput);
      this.jumpByStep(index, 1);
      if (glueIndex === value.length - 1) {
        this.props.onChange && this.props.onChange(this.joinInputs(inputData));
        this.setState({ inputData });
      } else {
        this.setInputValue(index + 1, value.slice(glueIndex + 1, value.length));
      }
      return;
    }

    let trimmed = value;
    if (trimRegex !== undefined) {
      trimmed = trimmed.replace(trimRegex, "");
    }
    if (trimmed.length == maxInput + 1) {
      // only do it if it's manually typed.
      if (index + 1 < inputs.length) {
        inputData[index + 1] = trimmed[trimmed.length - 1];
        this.jumpByStep(index, 1);
      }
    }

    trimmed = trimmed.slice(0, length);
    inputData[index] = trimmed;
    this.props.onChange && this.props.onChange(this.joinInputs(inputData));
    this.setState({ inputData });
  };

  onKeyDown = (e: any) => {
    const index = parseInt(e.currentTarget.getAttribute("data-index"));

    if (e.key === "Backspace" && e.currentTarget.value === "") {
      this.jumpByStep(index, -1);
    }
  };

  renderInput = (input: InputConfig, index: number) => {
    const { length = 1, glueChar, placeholder } = input;
    const { inputData } = this.state;

    return (
      <React.Fragment key={index}>
        <input
          ref={this.refList[index]}
          value={inputData[index] || ""}
          data-index={index}
          style={{ flexGrow: length }}
          placeholder={placeholder}
          onKeyDown={this.onKeyDown}
          onChange={this.onInputChange}
          className={this.props.inputClassName}
        />
        <p>{glueChar || ""}</p>
      </React.Fragment>
    );
  };

  render() {
    const inputElements = this.props.inputs.map((input, index) => {
      return this.renderInput(input, index);
    });

    return (
      <div>
        {this.props.label ? (
          <label className={this.props.labelClassName}>
            {this.props.label}
          </label>
        ) : null}
        <div style={{ display: "flex" }} className="ui input">
          {inputElements}
        </div>
      </div>
    );
  }
}
