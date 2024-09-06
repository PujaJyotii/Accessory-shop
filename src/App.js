import React, { useState } from "react";
import Header from "./UI/Header";
import { Route, Routes } from "react-router-dom";
import GetData from "./Pages/GetData";
import Information from "./Pages/Information";
import YourWish from "./Pages/YourWish";
import Cart from "./Cart/Cart";

function App() {
  const [show, setShow] = useState(false);
  const showHandler = () => {
    setShow(true);
  };
  const hideHandler = () => {
    setShow(false);
  };
  return (
    <div>
      {show && <Cart onShow={showHandler} onHide={hideHandler} />}
      <Header onShow={showHandler} />
      <Routes>
        <Route path="/" element={<GetData />} />
        <Route path="/info" element={<Information />} />
        <Route path="/wish" element={<YourWish />} />
      </Routes>
    </div>
  );
}

export default App;
