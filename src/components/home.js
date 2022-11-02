import React, { useEffect, useRef, useState } from "react";
import { Balloons } from "./balloons";
import "./home.css";

let enteredValue;
export const Home = () => {

  let txtRef = useRef();      // input
  let [txtColor, setTxtColor] = useState("green");
  let [emptyDivArray, setemptyDivArray] = useState([]);
  let [balloonList, setBalloonList] = useState([]);
  let [currentValue, setCurrentValue] = useState(false);
  // should be names showValue or something

  useEffect(() => {
    setBalloonList(getBalloonColors());
  }, []);

  // getColors function is to return the random array of objects with color and unique values
  const getBalloonColors = () => {
    let finalColors = getRandomColor(5);
    let tempArr = [];
    for (let i = 0; i < 5; i++) {
      let obj = {};
      obj['id'] = i + 1;
      obj['value'] = finalColors[i]
      tempArr.push(obj);
    }
    return tempArr;
  };

  const getRandomColor = (length) => {
    const totalColor = [];
    let chars = '0123456789ABCDEFGH';
    for (let i = 0; i < length; i++) {
      let color = '#';
      for (let j = 0; j < 6; j++) {
        color += chars[Math.floor(Math.random() * 16)];
      }
      totalColor.push(color);
    }
    return totalColor;
  };

  const handleShoot = () => {
    enteredValue = Number(txtRef.current.value);
    if (enteredValue > balloonList.length || enteredValue === 0) {
      // error boundary
      setTxtColor("red");
      setCurrentValue(!currentValue)
      return;
    }

    setTxtColor("green");
    setCurrentValue(false);

    //set state using spread operator
    setemptyDivArray([...emptyDivArray, ...[balloonList[enteredValue - 1]]]);
    setBalloonList([...balloonList.slice(0, enteredValue - 1), ...balloonList.slice(enteredValue)]);
  };

  const handleBalloonClick = (e) => {
    const targetID = e.target.id;
    const targetElement = getArrayElementById(emptyDivArray, targetID);

    // Set empty div array by filtering out the item id clicked
    setemptyDivArray((current) =>
      current.filter(
        (item) =>
          item.id !== targetElement.id
      )
    );

    // crt new ballon list and sort on id 
    const newBallonList = [...balloonList, targetElement];
    newBallonList.sort((a, b) => {
      return a.id - b.id;
    });
    setBalloonList(newBallonList);
  };

  const getArrayElementById = (array, targetID) => {
    return array.find(({ id }) => id == targetID);
  };

  return (
    <div id="main-div">
      {/* Empty Container */}
      <div>
        <h3> Container </h3>
        <br />
        <div id="empty-div">
          <Balloons
            array={emptyDivArray}
            handleClick={handleBalloonClick}
          />
        </div>
      </div>
      <div>
        <h3> Balloons </h3>
        <br />
        <Balloons
          array={balloonList} />
      </div>
      {/* shoot button with input*/}
      <div>
        <div id="input-div">
          <div style={{ color: `${txtColor}` }}>
            {
              balloonList.length === 0
                ?
                <span>
                  Shoot from the ballon from the Container
                </span>
                :
                <span>
                  Enter any number 1-{balloonList.length}
                </span>
            }
          </div>
          <input ref={txtRef} type="number" defaultValue={1} min="1" max={balloonList.length} />
          {
            currentValue
            &&
            <span>
              You entered :: {enteredValue}
            </span>
          }
          <button
            style={{ cursor: "pointer" }}
            onClick={handleShoot}>Shoot</button>
        </div>
      </div>
    </div>
  );
};
