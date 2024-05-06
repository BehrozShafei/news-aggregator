import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import {
  Box,
  Divider,
  Autocomplete,
  Select,
  MenuItem,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { arrHeadlineNews } from "./data";
export default function FilterPage() {
  const [open, setOpen] = useState(false);
  const [headlineNews, setHeadlineNews] = useState(arrHeadlineNews);
  const [areeshow, setAreeshow] = useState([]);
  const [valueInput, setValueInput] = useState("search");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSource, setSelectedSource] = useState("");

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
  const handleFilter = () => {
    // Pass the selected filters to the parent component for filtering
    filterData({
      date: selectedDate,
      category: selectedCategory,
      source: selectedSource,
    });
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
        filter
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
        <div>
          <DatePicker
            label="Controlled picker"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
          />
          {/* Category Filter */}
          <Autocomplete
            id="category"
            options={[
              "Business",
              "History",
              "Politics",
              "Sport",
              "International",
            ]}
            value={selectedCategory}
            onChange={(e, value) => setSelectedCategory(value)}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />

          {/* Source Filter */}
          <Select
            id="source"
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            label="Source"
          >
            <MenuItem value="">All Sources</MenuItem>
            <MenuItem value="guardian">Guardian</MenuItem>
            <MenuItem value="newsapi">NewsAPI</MenuItem>
            <MenuItem value="nytimes">New York Times</MenuItem>
          </Select>

          {/* Filter Button */}
          <Button variant="contained" onClick={handleFilter}>
            Filter
          </Button>
        </div>
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
