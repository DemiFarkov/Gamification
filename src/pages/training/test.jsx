import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { data } from "./data";
import TheoryBlock from "./theoryBlock";
import QueBlock from "./queBlock";
import Header from "../../components/general/header";
import classes from "./traning.module.css";
import Navigation from "../../components/general/navigation";
import Final from "./final";
const CountQue = () => {
  return <div className={classes.queCircle}></div>;
};
const Test = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [countForData, setCountForData] = useState(0);
  const [typeBlock, setTypeBlock] = useState();
  const [countAnswers, setCountAnswers] = useState(0);
  const [list, setList] = useState([]);
  const [countQue, setCountQue] = useState(1);
  const bloks = data.bloks;
  const idTest = searchParams.get("id");
  useEffect(() => {
    for (let i = 0; i < bloks.length; i++) {
      if (bloks[i].type == "question") {
        setList((prevList) => prevList.concat(<CountQue key={i} />));
      }
    }
  }, []);
  useEffect(() => {
    if (countForData !== bloks.length) {
      setTypeBlock(bloks[countForData].type);
    }
  }, [countForData]);

  return (
    <div>
      <Header />
      <div className={classes.mainContentBox}>
        <Navigation />
        {countForData !== bloks.length ? (
          typeBlock == "theory" ? (
            <TheoryBlock
              data={bloks[countForData]}
              setCountForData={setCountForData}
              countForData={countForData}
              blockLength={bloks.length}
            />
          ) : typeBlock == "question" ? (
            <QueBlock
              setCountQue={setCountQue}
              countQue={countQue}
              data={bloks[countForData]}
              setCountForData={setCountForData}
              countForData={countForData}
              countAnswers={countAnswers}
              setCountAnswers={setCountAnswers}
              list={list}
              blockLength={bloks.length}
            />
          ) : (
            <div>OOps</div>
          )
        ) : (
          <Final />
        )}
      </div>
    </div>
  );
};

export default Test;
