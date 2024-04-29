import { useState } from "react";
import "./App.css";
import Blog from "./views/Blog";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import NewsPage from "./views/NewsPage";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div className="main">
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="post" element={<NewsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
