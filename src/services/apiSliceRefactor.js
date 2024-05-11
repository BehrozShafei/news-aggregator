// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const getData = async (sourceNews) => {
//     let result = [];

//     // Create a single API instance
//     const api = createApi({
//         reducerPath: "api",
//         baseQuery: fetchBaseQuery({ baseUrl: "" }), // Base URL will be updated for each endpoint
//         endpoints: (builder) => {
//             sourceNews.forEach(({ name, baseUrl, params, responseJson, schemaOutput }) => {
//                 builder.query({
//                     query: (filter) => {
//                         console.log('sajjad')
//                         const queryString = new URLSearchParams({ ...params, ...filter }).toString();
//                         console.log('queryString', queryString)
//                         return `${baseUrl}/top-headlines?${queryString}`;
//                     },
//                     transformResponse: (response) => {
//                         const data = response[responseJson].map((obj) => ({
//                             title: obj[schemaOutput.title],
//                             date: obj[schemaOutput.date],
//                             description: obj[schemaOutput.description],
//                             image: obj[schemaOutput.image],
//                             imageLabel: schemaOutput.imageLabel,
//                             author: obj[schemaOutput.author],
//                             source: name,
//                         }));
//                         result.push(...data);
//                     },
//                 });
//             });
//         },
//     });

//     // Dispatch queries and await completion
//     await api.endpoints.fetchNews.initiate(); // Initiate all queries
//     await api.endpoints.fetchNews.select(); // Wait for all queries to complete

//     return result; // Return the combined result
// };
import axios from "axios";

function getNestedValue(obj, keyString) {
    // Split the keyString into individual keys
    const keys = keyString.split(".");

    // Start with the original object
    let value = obj;

    // Traverse through each key
    for (const key of keys) {
        // Access the nested property
        if (value && typeof value === "object" && key in value) {
            value = value[key];
        } else {
            // Return undefined if any intermediate property is missing
            return undefined;
        }
    }

    return value;
}

export const getData = async (sourceNews, page, query) => {
    let result = [];
    let flagError = false;
    // Define a function to fetch data from a single source
    const fetchData = async ({
        baseUrl,
        params,
        responseJson,
        schemaOutput,
        name,
    }) => {
        const queryString = new URLSearchParams({
            ...params,
            page,
            q: query,
        }).toString();
        const url = `${baseUrl}?${queryString}`;
        try {
            const response = await axios.get(url);
            const newList = getNestedValue(response.data, responseJson);
            const data = newList.map((obj) => ({
                title: getNestedValue(obj, schemaOutput.title),
                date: obj[schemaOutput.date],
                description: obj[schemaOutput.description],
                image: schemaOutput.image(obj),
                imageLabel: schemaOutput.imageLabel,
                author: schemaOutput.author(obj),
                source: name,
            }));
            result.push(...data);
        } catch (error) {
            console.error(`Error fetching data from ${baseUrl}:`, error);
            flagError = true;
        }
    };

    // Fetch data from each source in parallel
    await Promise.all(sourceNews.map(fetchData));

    return { result, flagError };
};
