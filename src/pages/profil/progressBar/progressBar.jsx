const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    width: "85%",
    margin: "0 auto",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: "#97dadd",
    borderRadius: "inherit",
    textAlign: "right",
  };

  const labelStyles = {
    marginRight: ".9vw",
    fontSize: "1vw",
    color: "black",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <div style={labelStyles}>{`${completed}%`}</div>
      </div>
    </div>
  );
};

export default ProgressBar;
