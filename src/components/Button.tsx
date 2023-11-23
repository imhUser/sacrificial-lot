import React, { ReactNode } from "react";

interface Props {
  buttonTitle: string;
  onClick: (title: string) => void;
  style?: React.CSSProperties;
  additionalStyles?: string[];
  additionalTextAsHtml?: ReactNode;
}

const Button = ({ buttonTitle, onClick, style, additionalStyles=[], additionalTextAsHtml }: Props) => {
  return (
    <button
      type="button"
      className={"btn " + additionalStyles.join(" ")}
      style={ style }
      onClick={()=>onClick(buttonTitle)}
    >
      { buttonTitle } {additionalTextAsHtml}
    </button>
  );
};

export default Button;
