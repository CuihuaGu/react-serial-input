import * as React from "react";

type Props = {
  index: number;
  style?: Object;
  focus?: boolean;
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (e: any) => void;
  onKeyDown?: (e: any) => void;
};

const Input = (props: Props) => {
  return (
    <input
      defaultValue={props.defaultValue}
      data-index={props.index}
      style={props.style || {}}
      className={props.className}
      placeholder={props.placeholder}
      autoFocus={props.focus === true}
      onKeyDown={props.onKeyDown}
      onChange={props.onChange}
    />
  );
};

export default Input;
