import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URLS = {
  newsApi: "https://newsapi.org/v2",
  nyTimesApi: "https://api.nytimes.com/svc",
  guardianApi: "https://content.guardianapis.com",
};

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URLS.newsApi }),
  endpoints: (builder) => ({
    fetchNews: builder.query({
      query: (filter) => {
        const { page, query } = filter;
        const queryParams = {
          country: "us",
          page: page || 0,
          pageSize: 10,
          category: "business",
          apiKey: "bf5501913fdc445884bc6eca512af789",
        };
        // Add query parameter only if it's not empty
        if (query?.trim() !== "") {
          queryParams.q = query;
        }
        const queryString = new URLSearchParams(queryParams).toString();
        return `https://newsapi.org/v2/top-headlines?${queryString}`;
      },
      transformResponse: (response) => {
        // Normalize news data
        return response.articles.map((obj) => ({
          title: obj.title,
          date: obj.publishedAt,
          description: obj.description,
          image: obj.urlToImage,
          imageLabel: "Image Text",
          author: obj.author ? `Author: ${obj.author}` : "No Author",
          source: "NewsAPI",
        }));
      },
    }),
    fetchNyTimes: builder.query({
      query: (filter) => {
        const { page, query } = filter;

        const queryParams = {
          page: page || 0,
          "api-key": "osGH0dn73I1UxhaMB74gR13KEEePOsNK",
        };
        // Construct the query string only if query is not empty
        if (query?.trim() !== "") {
          queryParams.q = query;
        }
        const queryString = new URLSearchParams(queryParams).toString();
        return `${API_BASE_URLS.nyTimesApi}/search/v2/articlesearch.json?${queryString}`;
      },
      baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URLS.nyTimesApi }),
      transformResponse: (response) => {
        // Normalize NY Times data
        return response.response.docs.map((obj) => ({
          title: obj.headline.main,
          date: obj.pub_date,
          description: obj.abstract,
          image:
            obj.multimedia.length > 0
              ? "https://nytimes.com/" + obj.multimedia[0].url
              : "",
          author:
            obj.byline && obj.byline.person.length > 0
              ? `Author: ${obj.byline.person[0].firstname} ${obj.byline.person[0].lastname}`
              : "No Author",
          source: "NewYorkTimes",
          imageLabel: "Image Text",
        }));
      },
    }),
  }),
});

export const { useFetchNewsQuery, useFetchNyTimesQuery } = api;
export default api;
