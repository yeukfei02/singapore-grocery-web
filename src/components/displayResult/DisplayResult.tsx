import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Carousel from "react-material-ui-carousel";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import { getRootUrl } from "../../helpers/helpers";

const rootUrl = getRootUrl();

function DisplayResult(props: any) {
  const [fairpriceProducts, setFairpriceProducts] = useState([]);
  const [giantProducts, setGiantProducts] = useState([]);
  const [coldstorageProducts, setColdstorageProducts] = useState([]);

  let [fairpricePage, setFairpricePage] = useState(0);
  let [giantPage, setGiantPage] = useState(0);
  let [coldstoragePage, setColdstoragePage] = useState(0);

  const [fairpriceProductsChecked, setFairpriceProductsChecked] =
    useState(false);
  const [giantProductsChecked, setGiantProductsChecked] = useState(false);
  const [coldstorageProductsChecked, setColdstorageProductsChecked] =
    useState(false);

  useEffect(() => {
    if (props.searchKeyword) {
      const delayDebounceFn = setTimeout(() => {
        getFairpriceProducts(
          props.searchKeyword,
          fairpricePage,
          fairpriceProductsChecked
        );
      }, 1500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [props.searchKeyword, fairpricePage, fairpriceProductsChecked]);

  useEffect(() => {
    if (props.searchKeyword) {
      const delayDebounceFn = setTimeout(() => {
        getGiantProducts(props.searchKeyword, giantPage, giantProductsChecked);
      }, 1500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [props.searchKeyword, giantPage, giantProductsChecked]);

  useEffect(() => {
    if (props.searchKeyword) {
      const delayDebounceFn = setTimeout(() => {
        getColdstorageProducts(
          props.searchKeyword,
          coldstoragePage,
          coldstorageProductsChecked
        );
      }, 1500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [props.searchKeyword, coldstoragePage, coldstorageProductsChecked]);

  const getFairpriceProducts = async (
    searchKeyword: string,
    fairpricePage?: number,
    fairpriceProductsChecked?: boolean
  ) => {
    let params = {
      search_keyword: searchKeyword,
    };
    if (fairpricePage && fairpricePage > 0) {
      params = Object.assign(params, { page: fairpricePage });
    }
    if (!fairpriceProductsChecked) {
      params = Object.assign(params, { order_by: "asc" });
    } else {
      params = Object.assign(params, { order_by: "desc" });
    }

    const response = await axios.get(`${rootUrl}/fairprice/products`, {
      params: params,
    });
    if (response) {
      const responseData = response.data;
      setFairpriceProducts(responseData.products);
    }
  };

  const getGiantProducts = async (
    searchKeyword: string,
    giantPage?: number,
    giantProductsChecked?: boolean
  ) => {
    let params = {
      search_keyword: searchKeyword,
    };
    if (giantPage && giantPage > 0) {
      params = Object.assign(params, { page: giantPage });
    }
    if (!giantProductsChecked) {
      params = Object.assign(params, { order_by: "asc" });
    } else {
      params = Object.assign(params, { order_by: "desc" });
    }

    const response = await axios.get(`${rootUrl}/giant/products`, {
      params: params,
    });
    if (response) {
      const responseData = response.data;
      setGiantProducts(responseData.products);
    }
  };

  const getColdstorageProducts = async (
    searchKeyword: string,
    coldstoragePage?: number,
    coldstorageProductsChecked?: boolean
  ) => {
    let params = {
      search_keyword: searchKeyword,
    };
    if (coldstoragePage && coldstoragePage > 0) {
      params = Object.assign(params, { page: coldstoragePage });
    }
    if (!coldstorageProductsChecked) {
      params = Object.assign(params, { order_by: "asc" });
    } else {
      params = Object.assign(params, { order_by: "desc" });
    }

    const response = await axios.get(`${rootUrl}/cold-storage/products`, {
      params: params,
    });
    if (response) {
      const responseData = response.data;
      setColdstorageProducts(responseData.products);
    }
  };

  const renderProductImages = (images: string[]) => {
    let productImages: any[] = [];

    if (images) {
      productImages = images.map((image: string, i: number) => {
        return (
          <CardMedia
            key={i}
            component="img"
            height="350"
            image={image}
            alt=""
          />
        );
      });
    }

    return productImages;
  };

  const renderOffers = (offers: string[]) => {
    let offersDiv: any[] = [];

    if (offers) {
      offersDiv = offers.map((offer: string, i: number) => {
        return (
          <Typography
            key={i}
            gutterBottom
            variant="h4"
            component="div"
            color="red"
          >
            <b>{offer}</b>
          </Typography>
        );
      });
    }

    return offersDiv;
  };

  const handleProductNameClick = (slug: string, type: string) => {
    if (type) {
      switch (type) {
        case "fairprice":
          window.open(`https://www.fairprice.com.sg/product/${slug}`);
          break;
        case "giant":
          window.open(`https://giant.sg/${slug}`);
          break;
        case "coldstorage":
          window.open(`https://coldstorage.com.sg/${slug}`);
          break;
        default:
          break;
      }
    }
  };

  const renderFairpriceProducts = (fairpriceProducts: any[]) => {
    let fairpriceProductsDiv: any[] = [];

    if (fairpriceProducts) {
      fairpriceProductsDiv = fairpriceProducts.map(
        (product: any, i: number) => {
          return (
            <Card key={i} className="my-4 p-4">
              <Carousel>
                <div
                  className="mouse-over"
                  onClick={() =>
                    handleProductNameClick(product.slug, "fairprice")
                  }
                >
                  {renderProductImages(product.images)}
                </div>
              </Carousel>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  onClick={() =>
                    handleProductNameClick(product.slug, "fairprice")
                  }
                >
                  <div className="mouse-over text-underline">
                    {product.name}
                  </div>
                </Typography>
                <Typography variant="h4">${product.price}</Typography>
                <div className="my-3">{renderOffers(product.offers)}</div>
                <Alert
                  icon={false}
                  severity="info"
                  className="mt-2"
                  style={{ display: "inline-block" }}
                >
                  {product.tag}
                </Alert>
              </CardContent>
            </Card>
          );
        }
      );
    }

    return fairpriceProductsDiv;
  };

  const renderGiantProducts = (giantProducts: any[]) => {
    let giantProductsDiv: any[] = [];

    if (giantProducts) {
      giantProductsDiv = giantProducts.map((product: any, i: number) => {
        return (
          <Card key={i} className="my-4 p-4">
            <Carousel>
              <div
                className="mouse-over"
                onClick={() => handleProductNameClick(product.slug, "giant")}
              >
                {renderProductImages(product.images)}
              </div>
            </Carousel>
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                onClick={() => handleProductNameClick(product.slug, "giant")}
              >
                <div className="mouse-over text-underline">{product.name}</div>
              </Typography>
              <Typography variant="h4">${product.price}</Typography>
              <div className="my-3">{renderOffers(product.offers)}</div>
              <Alert
                icon={false}
                severity="success"
                className="mt-2"
                style={{ display: "inline-block" }}
              >
                {product.tag}
              </Alert>
            </CardContent>
          </Card>
        );
      });
    }

    return giantProductsDiv;
  };

  const renderColdstorageProducts = (coldstorageProducts: any[]) => {
    let coldstorageProductsDiv: any[] = [];

    if (coldstorageProducts) {
      coldstorageProductsDiv = coldstorageProducts.map(
        (product: any, i: number) => {
          return (
            <Card key={i} className="my-4 p-4">
              <Carousel>
                <div
                  className="mouse-over"
                  onClick={() =>
                    handleProductNameClick(product.slug, "coldstorage")
                  }
                >
                  {renderProductImages(product.images)}
                </div>
              </Carousel>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  onClick={() =>
                    handleProductNameClick(product.slug, "coldstorage")
                  }
                >
                  <div className="mouse-over text-underline">
                    {product.name}
                  </div>
                </Typography>
                <Typography variant="h4">${product.price}</Typography>
                <div className="my-3">{renderOffers(product.offers)}</div>
                <Alert
                  icon={false}
                  severity="error"
                  className="mt-2"
                  style={{ display: "inline-block" }}
                >
                  {product.tag}
                </Alert>
              </CardContent>
            </Card>
          );
        }
      );
    }

    return coldstorageProductsDiv;
  };

  const handleFairpriceProductsSwitchChange = (e: any) => {
    setFairpriceProductsChecked(e.target.checked);
  };

  const handleGiantProductsSwitchChange = (e: any) => {
    setGiantProductsChecked(e.target.checked);
  };

  const handleColdstorageProductsSwitchChange = (e: any) => {
    setColdstorageProductsChecked(e.target.checked);
  };

  const handleRemoveButtonClick = (type: string) => {
    if (type) {
      switch (type) {
        case "fairprice":
          if (fairpricePage > 0) {
            fairpricePage -= 1;
            setFairpricePage(fairpricePage);
          }
          break;
        case "giant":
          if (giantPage > 0) {
            giantPage -= 1;
            setGiantPage(giantPage);
          }
          break;
        case "coldstorage":
          if (coldstoragePage > 0) {
            coldstoragePage -= 1;
            setColdstoragePage(coldstoragePage);
          }
          break;
        default:
          break;
      }
    }
  };

  const handleAddButtonClick = (type: string) => {
    if (type) {
      switch (type) {
        case "fairprice":
          fairpricePage += 1;
          setFairpricePage(fairpricePage);
          break;
        case "giant":
          giantPage += 1;
          setGiantPage(giantPage);
          break;
        case "coldstorage":
          coldstoragePage += 1;
          setColdstoragePage(coldstoragePage);
          break;
        default:
          break;
      }
    }
  };

  const handleFabButtonClick = () => {
    window.scrollTo(0, 0);
  };

  const renderGridColumns = () => {
    let gridColumns = null;

    if (fairpriceProducts && giantProducts && coldstorageProducts) {
      gridColumns = (
        <div>
          <Grid container spacing={2}>
            <Grid item sm={4} md={4} className="p-3">
              <FormGroup className="my-3">
                <FormControlLabel
                  control={
                    <Switch
                      checked={fairpriceProductsChecked}
                      onChange={handleFairpriceProductsSwitchChange}
                      inputProps={{ "aria-label": "controlled" }}
                      defaultChecked
                    />
                  }
                  label={
                    !fairpriceProductsChecked
                      ? "Order By Price Asc"
                      : "Order By Price Desc"
                  }
                />
              </FormGroup>

              <div className="d-flex flex-row align-items-center">
                <Typography
                  className="my-1"
                  gutterBottom
                  variant="h6"
                  component="div"
                >
                  Page: {fairpricePage}
                </Typography>
                <Stack className="ml-2" direction="row">
                  <IconButton
                    aria-label="remove"
                    color="primary"
                    onClick={() => handleRemoveButtonClick("fairprice")}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton
                    aria-label="add"
                    color="primary"
                    onClick={() => handleAddButtonClick("fairprice")}
                  >
                    <AddIcon />
                  </IconButton>
                </Stack>
              </div>

              {renderFairpriceProducts(fairpriceProducts)}
            </Grid>
            <Grid item sm={4} md={4} className="p-3">
              <FormGroup className="my-3">
                <FormControlLabel
                  control={
                    <Switch
                      checked={giantProductsChecked}
                      onChange={handleGiantProductsSwitchChange}
                      inputProps={{ "aria-label": "controlled" }}
                      color="success"
                      defaultChecked
                    />
                  }
                  label={
                    !giantProductsChecked
                      ? "Order By Price Asc"
                      : "Order By Price Desc"
                  }
                />
              </FormGroup>

              <div className="d-flex flex-row align-items-center">
                <Typography
                  className="my-1"
                  gutterBottom
                  variant="h6"
                  component="div"
                >
                  Page: {giantPage}
                </Typography>
                <Stack className="ml-2" direction="row">
                  <IconButton
                    aria-label="remove"
                    color="success"
                    onClick={() => handleRemoveButtonClick("giant")}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton
                    aria-label="add"
                    color="success"
                    onClick={() => handleAddButtonClick("giant")}
                  >
                    <AddIcon />
                  </IconButton>
                </Stack>
              </div>

              {renderGiantProducts(giantProducts)}
            </Grid>
            <Grid item sm={4} md={4} className="p-3">
              <FormGroup className="my-3">
                <FormControlLabel
                  control={
                    <Switch
                      checked={coldstorageProductsChecked}
                      onChange={handleColdstorageProductsSwitchChange}
                      inputProps={{ "aria-label": "controlled" }}
                      color="error"
                      defaultChecked
                    />
                  }
                  label={
                    !coldstorageProductsChecked
                      ? "Order By Price Asc"
                      : "Order By Price Desc"
                  }
                />
              </FormGroup>

              <div className="d-flex flex-row align-items-center">
                <Typography
                  className="my-1"
                  gutterBottom
                  variant="h6"
                  component="div"
                >
                  Page: {coldstoragePage}
                </Typography>
                <Stack className="ml-2" direction="row">
                  <IconButton
                    aria-label="remove"
                    color="error"
                    onClick={() => handleRemoveButtonClick("coldstorage")}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton
                    aria-label="add"
                    color="error"
                    onClick={() => handleAddButtonClick("coldstorage")}
                  >
                    <AddIcon />
                  </IconButton>
                </Stack>
              </div>

              {renderColdstorageProducts(coldstorageProducts)}
            </Grid>
          </Grid>

          <Fab
            color="error"
            aria-label="add"
            style={{
              margin: 0,
              top: "auto",
              right: 30,
              bottom: 30,
              left: "auto",
              position: "fixed",
            }}
            onClick={() => handleFabButtonClick()}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </div>
      );
    }

    return gridColumns;
  };

  return <div>{renderGridColumns()}</div>;
}

export default DisplayResult;
