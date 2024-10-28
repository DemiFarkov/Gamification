import { useState } from "react";
import "./progressBar.css";

const ProgressBar = (props) => {
  const { bgcolor, completed, data } = props;
  const [amount, setAmount] = useState(
    `${data.experience} / ${data.next_level_experience}`
  );
  const amountExperience = Math.floor(
    (data.experience / (data.next_level_experience)) * 100
  );
  const completedd = amountExperience;

  const fillerStyles = {
    height: "20px",
    width: `${completedd}%`,
    maxWidth:"100%",
    backgroundColor: "#97dadd",
    borderRadius: "inherit",
    textAlign: "right",
  };

  return (
    <div
      className="containerStyles"
      onMouseOver={() => {
        setAmount(
          `${Math.floor((data.experience / data.next_level_experience
          ) * 100)}%`
        );
      }}
      onMouseOut={() => {
        setAmount(`${data.experience} / ${data.next_level_experience        }`);
      }}
    >
      <div className="labelStyles">{amount}</div>
      <div style={fillerStyles} className="fillerStyles"></div>
    </div>
  );
};

export default ProgressBar;
