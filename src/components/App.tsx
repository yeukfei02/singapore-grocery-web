import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DisplayResult from "./displayResult/DisplayResult";
import BottomDrawer from "./bottomDrawer/BottomDrawer";
import axios from "axios";
import { useDebounce } from "react-use";
import { getRootUrl } from "../helpers/helpers";

const rootUrl = getRootUrl();

const theme = createTheme({
  typography: {
    fontFamily: `"Karla", sans-serif`,
  },
});

function App() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [open, setOpen] = useState(false);

  const [,] = useDebounce(
    () => {
      if (searchKeyword) {
        getSuggestionsRequest(searchKeyword);
      }
    },
    1000,
    [searchKeyword]
  );

  useEffect(() => {
    if (searchKeyword) {
      const delayDebounceFn = setTimeout(() => {
        getSuggestionsRequest(searchKeyword);
      }, 1000);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchKeyword]);

  const getSuggestionsRequest = async (searchKeyword: string) => {
    const response = await axios.get(`${rootUrl}/get-suggestions`, {
      params: {
        search_keyword: searchKeyword,
      },
    });
    if (response) {
      const responseData = response.data;
      if (responseData) {
        setSuggestions(responseData.suggestions);
      }
    }
  };

  const handleSearchKeywordChange = (e: any) => {
    setSearchKeyword(e.target.value);
  };

  const handleSelectedOptionsChange = (
    event: any,
    value: string | null,
    reason: string
  ) => {
    if (value) {
      setSearchKeyword(value);
    }

    if (reason === "clear") {
      setSearchKeyword("");
      setSuggestions([]);
    }
  };

  const handleClearAllButtonClick = () => {
    setSearchKeyword("");
    setSuggestions([]);
  };

  const toggleDrawer = (open: boolean) => {
    setOpen(open);
  };

  const renderDisplayResult = (searchKeyword: string) => {
    let displayResultDiv = null;

    if (searchKeyword) {
      displayResultDiv = (
        <div>
          <Button
            variant="outlined"
            color="error"
            className="w-100 my-3"
            onClick={() => handleClearAllButtonClick()}
          >
            Clear All
          </Button>

          <Button
            variant="outlined"
            color="info"
            className="w-100 my-1"
            onClick={() => toggleDrawer(true)}
          >
            Filter By Supermarket
          </Button>

          <DisplayResult searchKeyword={searchKeyword} />
          <BottomDrawer
            open={open}
            toggleDrawer={toggleDrawer}
            searchKeyword={searchKeyword}
          />
        </div>
      );
    }

    return displayResultDiv;
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="m-5">
        <Typography gutterBottom variant="h4" component="div">
          Singapore Grocery Web
        </Typography>

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          className="w-100 mt-3"
          options={suggestions}
          value={searchKeyword}
          inputValue={searchKeyword}
          onChange={(event, value, reason) =>
            handleSelectedOptionsChange(event, value, reason)
          }
          onInputChange={(e) => handleSearchKeywordChange(e)}
          renderInput={(params) => (
            <TextField {...params} label="Search Keyword" />
          )}
        />

        {renderDisplayResult(searchKeyword)}
      </div>
    </ThemeProvider>
  );
}

export default App;
