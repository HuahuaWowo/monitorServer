import React from "react";
import "./staticError.css";
import LeftTop from "./components/leftTop/leftTop";
import CenterTop from "./components/centerTop/centerTop";
import RightTop from "./components/rightTop/rightTop";
import BottomList from "./components/bottomList/bottomList";
function staticError() {
  return (
    <>
      <div className="top">
        <div className="left-top">
          <LeftTop></LeftTop>
        </div>
        <div className="center-top">
          <CenterTop></CenterTop>
        </div>
        <div className="right-top">
          <RightTop></RightTop>
        </div>
      </div>
      <div className="bottom">
        <BottomList></BottomList>
      </div>
    </>
  );
}

export default staticError;
