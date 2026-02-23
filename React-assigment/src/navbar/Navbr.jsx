import React from "react";
import rightImg from "../assets/right.svg";
const Navbr = ({ data, toggle }) => {
  return (
    <div>
      <div className="flex justify-between items-center ">
        <div className="">
          <p className=" font-medium text-xs md:text-sm">Whats new?</p>
          <h1 className=" font-bold md:text-2xl lg:text-4xl text-darkBlue">
            Take a look at some of our pets
          </h1>
        </div>

        <button
          onClick={toggle}
          className="md:px-7 md:py-2 px-2 py-1 md:text-sm border cursor-pointer text-xs  rounded-xl  md:rounded-2xl  border-darkBlue flex  text-darkBlue"
        >
          {data ? "View less" : "View more"} <img src={rightImg} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Navbr;
