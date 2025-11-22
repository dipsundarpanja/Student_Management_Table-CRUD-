import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Update from "./Pages/Update"; 
import Edit from "./Pages/Edit";
import Delete from "./Pages/Delete";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/update" element={<Update />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/delete/:id" element={<Delete />} />
    </Routes>
  );
}

export default App;
