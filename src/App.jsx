import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Blog from './views/Blog';
import MyFeed from './views/MyFeed';
import LandingPageLayout from './layouts/LandingPageLayout';
import MyFeedLayout from './layouts/MyFeedLayout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPageLayout>
              <Blog />
            </LandingPageLayout>
          }
        />
        <Route
          path="/:id"
          element={
            <LandingPageLayout>
              <Blog />
            </LandingPageLayout>
          }
        />
        <Route
          path="/MyFeed"
          element={
            <MyFeedLayout>
              <Route path="/MyFeed" element={<MyFeed />} />
              <Route path="/MyFeed/:id" element={<MyFeed />} />
            </MyFeedLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
