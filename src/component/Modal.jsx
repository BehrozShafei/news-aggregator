import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Autocomplete from "@mui/material/Autocomplete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { arrHeadlineNews } from "./data";
export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const [headlineNews, setHeadlineNews] = React.useState(arrHeadlineNews);
  const [areeshow, setAreeshow] = React.useState([]);
  const [valueInput, setValueInput] = React.useState("search");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleHeadlineNews = (id) => {
    setHeadlineNews((prevNews) =>
      prevNews.map((item) =>
        item.id === id ? { ...item, clear: !item.clear } : item
      )
    );
  };

  const updateAreeshow = (id) => {
    if (areeshow.some((item) => item.id === id)) {
      setAreeshow((prevAreeshow) =>
        prevAreeshow.filter((item) => item.id !== id)
      );
    } else {
      const newItem = headlineNews.find((item) => item.id === id);
      if (newItem) {
        setAreeshow((prevAreeshow) => [...prevAreeshow, newItem]);
      }
    }
  };

  const handleClear = (id) => {
    toggleHeadlineNews(id);
    updateAreeshow(id);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Customize
      </Button>
      <Dialog
        fullWidth
        maxWidth="md"
        dir="ltr"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Customize</DialogTitle>
        <DialogTitle id="alert-dialog-title">
          Choose & manage up to 12 topics for your homepage. They'll also appear
          under topics you follow.{" "}
        </DialogTitle>
        <Divider />
        <Grid mt={2} container>
          <Grid item xs={7}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                margin={0.5}
                padding={1}
                sx={{ bgcolor: "info.light", borderRadius: 1 }}
              >
                <Typography variant="h6">Headline news</Typography>
                {headlineNews.map((item) => (
                  <Button
                    sx={{ margin: "2px" }}
                    key={item.id}
                    onClick={() => handleClear(item.id)}
                    padding={1}
                    variant="outlined"
                    endIcon={item.clear ? <ClearIcon /> : ""}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>
              <Box
                height={50}
                margin={0.5}
                padding={2}
                sx={{ bgcolor: "info.light", borderRadius: 1, display: "flex" }}
              >
                <TextField id="" value={valueInput} />
                <IconButton aria-label="delete" size="large">
                  <AddBoxIcon />
                </IconButton>
              </Box>
              {/* <Box margin={0.5} sx={{ bgcolor: 'info.light', borderRadius: 1 }} >3</Box> */}
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box
              margin={0.5}
              sx={{
                bgcolor: "info.light",
                borderRadius: 1,
                height: 200,
                overflowy: "scroll",
              }}
            >
              <Typography variant="h6">Re-order your topics</Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {areeshow.length > 0 &&
                  areeshow.map((i) => (
                    <Button
                      sx={{ margin: 0.5 }}
                      key={i.id}
                      // onClick={() => handleclear(item.id)}
                      padding={1}
                      variant="outlined"
                      // endIcon={item.clear ? "" : <ClearIcon />}
                    >
                      {i.name}
                    </Button>
                  ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
