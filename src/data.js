import axios from "axios";

export default async function fetchData() {
  try {
    const response1 = await axios.get(
      "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=bf5501913fdc445884bc6eca512af789"
    );
    const response2 = await axios.get(
      "https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=osGH0dn73I1UxhaMB74gR13KEEePOsNK"
      //"https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=bf5501913fdc445884bc6eca512af789"
    );
    const response3 = await axios.get(
      "https://content.guardianapis.com/search?section=money&api-key=61d18adb-e829-4972-8ba5-7f2afac39e92"
    );

    // Handle responses
    debugger;
    const data1 = response1.data.articles;
    const data2 = response2.data.results;
    const data3 = response3.data.response.results;

    // Return combined data
    return { data1, data2, data3 };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
