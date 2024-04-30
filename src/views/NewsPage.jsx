import React, { useEffect, useState } from "react";
import { fetchDataNyTimes, fetchDataNews } from "../data";
import FeaturedPost from "../component/FeaturedPost";
import { Grid } from "@mui/material";

export default function NewsPage() {
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      try {

        const { normalizeNytimes } = await fetchDataNyTimes();
        const { normalize } = await fetchDataNews();
        // Combine and set the data
        debugger
        setNewsData([...normalizeNytimes, ...normalize]);
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
      <main>
        <Grid container spacing={4}>
          {newsData &&
            newsData.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
        </Grid>
      </main>
    </div>
  );
}
