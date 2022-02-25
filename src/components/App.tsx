import { useState } from "react";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DisplayResult from "./displayResult/DisplayResult";

const theme = createTheme({
  typography: {
    fontFamily: `"Karla", sans-serif`,
  },
});

function App() {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchKeywordChange = (e: any) => {
    setSearchKeyword(e.target.value);
  };

  const handleButtonChange = () => {
    setSearchKeyword("");
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
            onClick={() => handleButtonChange()}
          >
            Clear All
          </Button>

          <DisplayResult searchKeyword={searchKeyword} />
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

        <TextField
          className="w-100 mt-3"
          id="outlined-basic"
          label="Search Keyword"
          variant="outlined"
          value={searchKeyword}
          onChange={(e) => handleSearchKeywordChange(e)}
        />

        {renderDisplayResult(searchKeyword)}
      </div>
    </ThemeProvider>
  );
}

export default App;
