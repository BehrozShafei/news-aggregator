import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import dayjs, { Dayjs } from "dayjs";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { arrHeadlineNews } from "./data";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useLocation, useNavigate } from "react-router-dom";

export default function FilterPage({ filterData }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [headlineNews, setHeadlineNews] = useState(arrHeadlineNews);
  const [areeshow, setAreeshow] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
    const params = new URLSearchParams();
    setOpen(false);
    if (startDate) {
      params.set("begin_date", startDate.format("YYYY-MM-DD"));
    }
    if (endDate) {
      params.set("end_date", endDate.format("YYYY-MM-DD"));
    }

    // Add source parameter
    if (selectedSource) {
      params.set("source", selectedSource);
    }
    const queryString = params.toString();
    console.log(queryString);
    navigate(`/?${queryString}`);
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
        Filter
      </Button>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Filter</DialogTitle>
        <Divider />
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              sx={{ marginRight: 2 }}
            />
            <DatePicker
              label="end Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              sx={{ marginLeft: 2 }}
            />
          </LocalizationProvider>

          <Box mt={2}>
            <Select
              id="source"
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              displayEmpty
              fullWidth
              renderValue={(value) => (value ? value : "Source")}
            >
              <MenuItem value="" disabled>
                Source
              </MenuItem>
              <MenuItem value="newsApi">NewsAPI</MenuItem>
              <MenuItem value="NewYorkTimes">New York Times</MenuItem>
            </Select>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleFilter} variant="contained" autoFocus>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
