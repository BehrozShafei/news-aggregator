import { useState } from "react";
import "./App.css";
import Blog from "./views/Blog";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import HomeNews from "./views/HomeNews";
function App() {
  return (
    <div className="App">
      <div className="main">
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/:id" element={<Blog />} />
          <Route path="post" element={<HomeNews />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
