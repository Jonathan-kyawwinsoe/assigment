import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbr from "./navbar/Navbr";
import User from "./user/User";
import Users from "./lessuser/Users";
import Detail from "./detail/Detail";

const App = () => {
  const [Show, setShow] = useState(true);
  const toggleShow = () => {
    setShow(!Show);
  };

  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        "https://6996c1207d17864365752ee4.mockapi.io/api/v1/pets",
      );
      const productUser = await response.json();
      setProduct(productUser);
    };
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <div className="lg:px-32 lg:py-14 px-8 py-3.5">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbr data={Show} toggle={toggleShow} />
                {Show ? <User data={product} /> : <Users data={product} />}
              </>
            }
          />

          <Route path="/detail/:id" element={<Detail data={product} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
