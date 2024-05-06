import React, { useState } from "react";
import { Button, Collapse, Grid } from "@mui/material";
import FeaturedPost from "./../component/FeaturedPost"; // Import FeaturedPost component here
import { Container, Stack } from "@mui/system";

const CustomCollapseNews = ({ allData = [] }) => {
  const [expanded, setExpanded] = useState(false);
  console.log("allData", allData);
  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {/* Render the first two items without collapse */}
      {allData.slice(0, 4).map((post, index) => (
        <FeaturedPost key={index} post={post} />
      ))}

      {/* Render the rest of the items with collapse */}
      {allData.slice(4).map((post, index) => (
        <Collapse
          in={expanded}
          key={index}
          timeout="auto"
          unmountOnExit
          fullWidth
          sx={{ m: 2, width: "100%" }}
        >
          <FeaturedPost post={post} />
        </Collapse>
      ))}

      {/* Render the "Show More" button */}
      {allData.length > 2 && (
        <Container fullWidth alignItems="center" sx={{ margin: 0 }}>
          <Button
            item
            xs={12}
            md={6}
            sx={{ margin: "20px" }}
            onClick={handleExpand}
          >
            {expanded ? "Show Less" : "Show More"}
          </Button>
        </Container>
      )}
    </>
  );
};

export default CustomCollapseNews;
