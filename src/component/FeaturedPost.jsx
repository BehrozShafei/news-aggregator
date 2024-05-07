import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import NoImage from "./../assets/No-Image.svg";
import { Avatar } from "@mui/material";
function FeaturedPost(props) {
  const { post } = props;
  console.log('post', post)
  return (
    <Grid fullWidth sx={{ m: 2, width: "100%" }}>
      <CardActionArea
        component="a"
        href="#"
        sx={{ m: 2, width: "100%" }}
        fullWidth
      >
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post?.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post?.date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post?.description}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          <Avatar src={`../assets/NewYorkTimes.svg`} alt="Avatar" />
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: "none", sm: "block" } }}
            image={post?.image ? post.image : NoImage}
            alt={post?.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;
