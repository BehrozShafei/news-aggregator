import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import AlertDialog from "./Modal";
import FilterPage from "./Filter";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  boxShadow:
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
  margin: "8px",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),

  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
    },
  },
}));

function Header(props) {
  const { sections, title } = props;
  const location = useLocation();
  const [searchTerm, setSearchTerm] = React.useState("");
  let navigate = useNavigate();
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      const params = new URLSearchParams(location.search);
      params.set("query", searchTerm);
      const queryString = params.toString();
      navigate(`/?${queryString}`);
    }
  };
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography
          component="h3"
          variant="h4"
          color="inherit"
          align="start"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>

        <Search>
          <IconButton onClick={handleSearch} aria-label="search">
            <SearchIcon />
          </IconButton>
          <StyledInputBase
            type="text"
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Search>
        {/* <AlertDialog /> */}
        <FilterPage />
        <Link noWrap variant="body2" href={"/my-feed"}>
          <Avatar sx={{ m: 1 }} src="/broken-image.jpg" />
        </Link>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
