import React, { useEffect, useState } from "react";
import fetchData from "../data";

export default function NewsPage() {
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      debugger;
      try {
        const { data1, data2, data3 } = await fetchData();

        debugger;
        // Combine and set the data
        setNewsData([...data1, ...data2, ...data3]);
      } catch (error) {
        // Handle error
      }
    }

    fetchNews();
  }, []);

  // Render newsData in your component
  console.log("newsData", newsData);
  return (
    <div>
      test
      {newsData &&
        newsData.map((item, index) => (
          <div key={index}>
            {/* Render individual news item */}
            <p>{item.title}</p>
          </div>
        ))}
    </div>
  );
}
