import React from "react";
import "./loading.css"
function Loadings() {
  return (
    <div className="absolute  h-full w-full z-50 flex justify-center items-center  bg-black">
      <div class="loader">
        <div class="circle">
          <div class="dot"></div>
          <div class="outline"></div>
        </div>
        <div class="circle">
          <div class="dot"></div>
          <div class="outline"></div>
        </div>
        <div class="circle">
          <div class="dot"></div>
          <div class="outline"></div>
        </div>
        <div class="circle">
          <div class="dot"></div>
          <div class="outline"></div>
        </div>
      </div>
    </div>
  );
}

export default Loadings;
