import gif from "./img/364.gif";
export default function Not() {
  return (
    <div style={{ display: "flex", marginTop:"30%"}}>
      <div>
        <h1>Ooops</h1>
        <div>Padge not Found</div>
      </div>
      <img src={gif} height="72" width="90" alt="" />
    </div>
  );
}
