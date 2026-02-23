import React from "react";
import { Link } from "react-router-dom";

const Users = ({ data }) => {
  return (
    <div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-5 bg-cardColor mt-4">
        {data.slice(0, 8).map((user) => (
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
  );
};

export default Users;
