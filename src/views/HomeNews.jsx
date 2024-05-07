import React, { useEffect, useState } from "react";
import FeaturedPost from "../component/FeaturedPost";
import { Grid, Pagination } from "@mui/material";
import { Stack } from "@mui/system";

import { useFetchNewsQuery, useFetchNyTimesQuery } from "../services/apiSlice";
import CustomCollapseNews from "./CustomCollapseNews";
import { useLocation, useNavigate } from "react-router-dom";

function HomeNews() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  // Accessing query parameters
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || 0;
  const source = searchParams.get("source") || "all";
  // Fetch data from all three endpoints
  const [data, setData] = useState([]);
  // Fetch data based on source

  let fetchDataQueries = [];
  if (!source || source === "all") {
    fetchDataQueries = [
      useFetchNewsQuery({ page, query }),
      useFetchNyTimesQuery({ page, query }),
    ];
  } else {
    if (source.includes("newsApi")) {
      fetchDataQueries.push(useFetchNewsQuery({ page, query }));
    }
    if (source.includes("nyTimesApi")) {
      fetchDataQueries.push(useFetchNyTimesQuery({ page, query }));
    }
  }
  console.log("fetchDataQueries", fetchDataQueries);
  useEffect(() => {
    const fetchData = () => {
      try {
        const fetchedData = fetchDataQueries.map((query) => query.data);
        const combinedData = fetchedData.flat();
        setData(combinedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      }
    };

    fetchData();
  }, []);

  // const sourceQueryMap = {
  //   newsApi: useFetchNewsQuery,
  //   nyTimesApi: useFetchNyTimesQuery,
  //   // Add more sources as needed
  // };

  //   const {
  //     data: guardianData,
  //     isLoading: isLoadingGuardian,
  //     isError: isErrorGuardian,
  //   } = useFetchGuardianQuey();

  // Combine data from all endpoints

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data...</div>;
  }
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
          <CustomCollapseNews allData={data} />
        </Grid>
        <Stack alignItems="center" sx={{ margin: 0 }}>
          <Pagination count={10} color="primary" onChange={handleChange} />
        </Stack>
      </main>
    </div>
  );
}

export default HomeNews;
