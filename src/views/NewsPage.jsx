import React, { useEffect, useState } from "react";
import FeaturedPost from "../component/FeaturedPost";
import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { Pagination } from "@mui/material";

import {
  useFetchNewsQuery,
  useFetchNyTimesQuery,
} from "./../services/apiSlice";

function NewsPage() {
  const [page, setPage] = useState(0);
  // Fetch data from all three endpoints
  const {
    data: newsData = [],
    isLoading: isLoadingNews,
    isError: isErrorNews,
  } = useFetchNewsQuery(page);
  const {
    data: nyTimesData = [],
    isLoading: isLoadingNyTimes,
    isError: isErrorNyTimes,
  } = useFetchNyTimesQuery(page);
  const handleChange = (event, value) => {
    setPage(value);
  };
  //   const {
  //     data: guardianData,
  //     isLoading: isLoadingGuardian,
  //     isError: isErrorGuardian,
  //   } = useFetchGuardianQuey();

  // Combine data from all endpoints

  const allData = [...newsData, ...nyTimesData];

  // Handle loading and error states
  if (isLoadingNews || isLoadingNyTimes) {
    return <div>Loading...</div>;
  }

  if (isErrorNews || isErrorNyTimes) {
    return <div>Error fetching data...</div>;
  }
  console.log("allData", allData);
  // Render the combined data
  return (
    <div>
      <main>
        <Grid container spacing={4}>
          {allData &&
            allData.map((post) => (
              <FeaturedPost key={Math.random()} post={post} />
            ))}
        </Grid>
        <Stack spacing={2}>
          <Pagination count={10} color="primary" onChange={handleChange} />
        </Stack>
      </main>
    </div>
  );
}

export default NewsPage;
