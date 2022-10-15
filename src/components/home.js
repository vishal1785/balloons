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


  useEffect(() => {
    setBalloonList(getBalloonColors());
  }, []);

  // getColors function is to return the random array of objects with color and unique values
  const getBalloonColors = () => {
    let finalColors = getRandomColor(5);
    let tempArr = [];
    for (let i = 0; i < 5; i++) {
      let index = getRandom(0, finalColors.length - 1);
      let obj = {};
      obj[finalColors[index]] = i + 1;
      tempArr.push(obj);
      finalColors.splice(index, 1);
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

  const getRandom = (min, max) => {
    let itr1 = max - min + 1;
    let itr2 = Math.random() * itr1;
    let result = Math.floor(itr2) + min;
    return result;
  };

  const handleShoot = () => {
    enteredValue = Number(txtRef.current.value);
    if (enteredValue > balloonList.length || enteredValue === 0) {
      // error boundary
      setTxtColor("red");
      setCurrentValue(!currentValue)
      return;
    }

    let tempArr = [];
    setTxtColor("green");
    setCurrentValue(false);

    for (let i = 0; i < balloonList.length; i++) {
      if (enteredValue === i + 1) {
        setemptyDivArray([...emptyDivArray, ...[balloonList[i]]]);
      } else {
        tempArr.push(balloonList[i]);
      }
    }
    setBalloonList(tempArr);
  };

  const handleBalloonClick = (e) => {
    let outerArray = [];
    for (let i = 0; i < emptyDivArray.length; i++) {
      // del balloon onclick
      let num = Object.values(emptyDivArray[i]);
      if (num == e.target.id) {
        let innerArray = [];
        let count = 0;
        for (let j = 0; j < balloonList.length; j++) {
          // push ballon obj in ordr
          let value = Object.values(balloonList[j]);
          if (value[0] > num && count === 0) {
            innerArray.push(emptyDivArray[i]);
            innerArray.push(balloonList[j]);
            count++;
          } else {
            innerArray.push(balloonList[j]);
          }
        }
        if (innerArray.length !== balloonList.length + 1) {
          innerArray.push(emptyDivArray[i]);
        }
        setBalloonList(innerArray);
      } else {
        outerArray.push(emptyDivArray[i]);
      }
    }
    setemptyDivArray(outerArray);
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
