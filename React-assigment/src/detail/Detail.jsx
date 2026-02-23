import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import heartPhoto from "../assets/heart.svg";
import pet from "../assets/pet.svg";
import sms from "../assets/sms.svg";
import { Link } from "react-router-dom";

const Detail = ({ data }) => {
  const { id } = useParams();

  const user = data.find((item) => item.id === id);

  const swithchPage = useNavigate();

  if (!user) return <h1>Loading....</h1>;

  const seeMore = () => {
    swithchPage("/");
  };

  return (
    <div>
      <div className=" grid grid-cols-1 md:grid-cols-2 ">
        <div className="flex flex-col m-5">
          <div className="flex flex-col gap-4 md:flex-row md: md:justify-between items-center bg-Linear px-3 py-2 rounded-xl">
            <div className="flex gap-2 items-center">
              <img src={heartPhoto} alt="" />
              <p>100% health guarantee for pets</p>
            </div>
            <div className="flex gap-2 items-center">
              <img src={pet} alt=".." />
              <p>100% guarantee of pet identification</p>
            </div>
          </div>
          <img
            className="rounded-xl shadow-sm mt-5"
            src={user.avatar}
            alt=".."
          />
        </div>
        <div className="m-5">
          <div className=" mb-4 flex flex-col gap-4 ">
            <p className="text-NeturalColor text-sm">{user.sku}</p>
            <h1 className="text-header font-bold text-xl md:text-2xl">
              {user.name}
            </h1>
            <p className="text-darkBlue font-bold text-xl">{user.price} $</p>
          </div>
          <div className="flex flex-col gap-2 md:flex-row  md:gap-5 my-4">
            <button className="bg-button text-white  font-bold  px-7 py-2 rounded-3xl">
              Contact us
            </button>
            <button className="font-bold px-7 py-2 rounded-3xl border text-button">
              <div className="flex gap-3 items-center">
                <img src={sms} alt="" />
                <p>Chat with Monito</p>
              </div>
            </button>
          </div>
          <div className="md:flex md:flex-col gap-5">
            <div className="grid grid-cols-4  py-3 border-b border-b-Netural">
              <label className="col-span-2" htmlFor="">
                SKU
              </label>
              <p className="col-span-2">:{user.sku}</p>
            </div>
            <div className="grid grid-cols-4  py-3 border-b border-b-Netural">
              <label className="col-span-2" htmlFor="">
                Gender
              </label>
              <p className="col-span-2">:{user.gender}</p>
            </div>
            <div className="grid grid-cols-4  py-3 border-b border-b-Netural">
              <label className="col-span-2" htmlFor="">
                Age
              </label>
              <p className="col-span-2">:{user.age}</p>
            </div>
            <div className="grid grid-cols-4  py-3 border-b border-b-Netural">
              <label className="col-span-2" htmlFor="">
                Color
              </label>
              <p className="col-span-2">:{user.color}</p>
            </div>
            <div className="grid grid-cols-4  py-3 border-b border-b-Netural">
              <label className="col-span-2" htmlFor="">
                Type
              </label>
              <p className="col-span-2">:{user.type}</p>
            </div>
            <div className="grid grid-cols-4  py-3 border-b border-b-Netural">
              <label className="col-span-2" htmlFor="">
                Location
              </label>
              <p className="col-span-2">:{user.location}</p>
            </div>
            <div className="grid grid-cols-4  py-3 border-b border-b-Netural">
              <label className="col-span-2" htmlFor="">
                Pulished Date
              </label>
              <p className="col-span-2">:{user.published_date}</p>
            </div>
            <div className="grid grid-cols-4  py-3 border-b border-b-Netural">
              <label className="col-span-2" htmlFor="">
                Additional Information
              </label>
              <p className="col-span-2">:{user.information}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <p className="text-sm text-NeturalColor">What is News?</p>
        <button
          onClick={seeMore}
          className=" hover:text-button text-2xl font-bold"
        >
          See more Photo?
        </button>
      </div>
      <div className="mt-7">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-5 bg-cardColor mt-4">
          {data.slice(0, 4).map((user) => (
            <Link
              to={`/detail/${user.id}`}
              key={user.id}
              className="  rounded-2xl shadow-sm"
            >
              <img className="rounded-3xl p-2 " src={user.avatar} alt="" />
              <div className="px-2 my-2 gap-2 text-sm md:text-xl ">
                <h1 className="font-bold "> {user.name}</h1>
                <div className="flex flex-col md:flex">
                  <p>Gender :{user.gender}</p>
                  <p>Age:{user.age}</p>
                </div>
                <p> {user.price}$</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;
