import axios from "axios";

export async function fetchDataNews() {
  try {
    const response = await axios.get(
      "https://newsapi.org/v2/top-headlines?country=us&pageSize=10&category=business&apiKey=bf5501913fdc445884bc6eca512af789"
    );


    // Handle responses
    const data = response.data.articles;

    const normalize = [];

    // Iterate over arrayOfObject1 and normalize each object
    data.forEach(obj => {
      const normalizedObj = {
        title: obj.title,
        date: obj.publishedAt,
        description: obj.description,
        image: obj.urlToImage,
        imageLabel: "Image Text",
        author: obj.author ? `Author: ${obj.author}` : "No Author",
        source: "From object 1"
      };
      normalize.push(normalizedObj);
    });

    // Return combined data
    return { normalize };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
export async function fetchDataNyTimes() {
  try {

    const response = await axios.get(
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=osGH0dn73I1UxhaMB74gR13KEEePOsNK"
    );


    const data = response.data.response.docs;
    const normalizeNytimes = [];

    // Iterate over arrayOfObject1 and normalize each object
    data.forEach(obj => {
      const normalizedObj = {
        title: obj.headline.main,
        date: obj.pub_date,
        description: obj.abstract,
        image: obj.multimedia.length > 0 ? obj.multimedia[0].url : "",
        author: obj.byline.person.length > 0 ? `Author: ${obj.byline.person[0].firstname} ${obj.byline.person[0].lastname}` : "No Author",
        source: "From object 3",
        imageLabel: "Image Text",
      };
      normalizeNytimes.push(normalizedObj);
    });
    return { normalizeNytimes };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
