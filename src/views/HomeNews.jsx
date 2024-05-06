import React, { useEffect, useState } from "react";
import FeaturedPost from "../component/FeaturedPost";
import { Grid, Pagination } from "@mui/material";
import { Stack } from "@mui/system";

import { useFetchNewsQuery, useFetchNyTimesQuery } from "../services/apiSlice";
import CustomCollapseNews from "./CustomCollapseNews";
import { useLocation, useNavigate } from "react-router-dom";

function HomeNews() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  // Accessing query parameters
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || 0;
  // Fetch data from all three endpoints
  const {
    data: newsData = [],
    isLoading: isLoadingNews,
    isError: isErrorNews,
  } = useFetchNewsQuery({ page, query });
  const {
    data: nyTimesData = [],
    isLoading: isLoadingNyTimes,
    isError: isErrorNyTimes,
  } = useFetchNyTimesQuery({ page, query });

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
  const handleChange = (event, value) => {
    const params = new URLSearchParams(location.search);
    params.set("page", value);
    const queryString = params.toString();
    console.log(queryString);
    navigate(`/?${queryString}`);
  };
  const handleSearch = () => {};
  // Render the combined data
  return (
    <div>
      <main>
        <Grid container spacing={4}>
          {allData && <CustomCollapseNews allData={allData} />}
        </Grid>
        <Stack alignItems="center" sx={{ margin: 0 }}>
          <Pagination count={10} color="primary" onChange={handleChange} />
        </Stack>
      </main>
    </div>
  );
}

export default HomeNews;
