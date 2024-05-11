import React, { useEffect, useState } from "react";
import FeaturedPost from "../component/FeaturedPost";
import { Grid, Pagination } from "@mui/material";
import { Stack } from "@mui/system";

import { useFetchNewsQuery, useFetchNyTimesQuery } from "../services/apiSlice";
import CustomCollapseNews from "./CustomCollapseNews";
import { useLocation, useNavigate } from "react-router-dom";
import { config } from "../services/constValues";
import { getData } from "../services/apiSliceRefactor";

function HomeNews() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  // Accessing query parameters
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || 0;
  const source = searchParams.get("source") || "";
  const begin_date = searchParams.get("begin_date") || "";
  const end_date = searchParams.get("end_date") || "";
  const category = searchParams.get("category") || "";
  // Fetch data from all three endpoints
  const [data, setData] = useState([]);

  // Fetch data based on source
  let sourceNews = [
    {
      name: "newsApi",
      baseUrl: "https://newsapi.org/v2/top-headlines",
      params: {
        country: "us",
        page: page || 1,
        pageSize: config.newsApi.pageSize,
        apiKey: config.newsApi.apiKey,
        to: end_date,
        category,
        from: begin_date

      },
      responseJson: "articles",

      schemaOutput: {
        title: "title",
        date: "publishedAt",
        description: "description",
        image: (news) => {
          return news.urlToImage || "";
        },
        imageLabel: "Image Text",
        // author: author ? `Author: ${author}` : "No Author",
        source: "NewsAPI",
        author: (Author) => {
          return Author.author ? `Author: ${Author.author}` : "No Author";
        },
      },
    },
    {
      name: "NewYorkTimes",
      baseUrl: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
      params: {
        "api-key": config.newYorkTimesApi.apiKey,
        category,
        end_date,
        begin_date,
        page: page || 0,
      },
      responseJson: "response.docs",
      schemaOutput: {
        title: "headline.main",
        date: "pub_date",
        description: "abstract",
        image: (news) => {
          return news.multimedia.length > 0
            ? "https://nytimes.com/" + news.multimedia[0].url
            : "";
        },
        author: (Author) => {
          return Author.byline && Author.byline.person.length > 0
            ? `Author: ${Author.byline.person[0].firstname} ${Author.byline.person[0].lastname}`
            : "No Author";
        },
        source: "NewYorkTimes",
        imageLabel: "Image Text",
      },
    },
  ];
  const deleteEmptyParams = async (sourceNews) => {
    const removeNullValues = (obj) => {
      for (const key in obj) {
        if (obj[key] === "") {
          delete obj[key];
        }
      }
      return obj;
    };
    sourceNews.forEach((item, index) => {
      return item = { ...item, ...removeNullValues(item.params) }
    })


    return sourceNews

  }
  const makeFinalSource = async (sourceNews, source) => {
    if (source === "") {
      return sourceNews;
    }
    const selectedSource = sourceNews.find((obj) => obj.name === source);
    if (selectedSource) {
      return [selectedSource];
    }
    return sourceNews;
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const pureSourceNews = await deleteEmptyParams(sourceNews)
      const finalSource = await makeFinalSource(pureSourceNews, source);
      console.log('f', finalSource)
      const { result, flagError } = await getData(finalSource, page, query);
      console.log("result,flagError", result, flagError);
      if (flagError) {
        setIsError(true);
      } else {
        setData(result);
        setIsLoading(false);
      }
      // Handle the result here
    };
    fetchData();
  }, [page, query, category, source]);

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

  if (isError) {
    return <div>Error fetching data...</div>;
  }
  console.log('loader 1', isLoading)
  const handleChange = (event, value) => {
    const params = new URLSearchParams(location.search);
    params.set("page", value);
    const queryString = params.toString();
    console.log(queryString);
    navigate(`/?${queryString}`);
  };
  return (
    <div>
      <main>
        <Grid container spacing={4}>
          <CustomCollapseNews allData={data} isLoading={isLoading} />
        </Grid>
        <Stack alignItems="center" sx={{ margin: 0 }}>
          <Pagination
            count={10}
            defaultValue={page}
            color="primary"
            onChange={handleChange}
          />
        </Stack>
      </main>
    </div>
  );
}

export default HomeNews;
