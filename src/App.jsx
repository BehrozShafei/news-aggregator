import { useState } from "react";
import "./App.css";
import Blog from "./views/Blog";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import HomeNews from "./views/HomeNews";
import MyFeed from "./views/MyFeed";
function App() {
  return (
    <div className="App">
      <div className="main">
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/:id" element={<Blog />} />
          <Route path="/my-feed" element={<MyFeed />} />
          <Route path="/my-feed:id" element={<MyFeed />} />
          <Route path="post" element={<HomeNews />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
