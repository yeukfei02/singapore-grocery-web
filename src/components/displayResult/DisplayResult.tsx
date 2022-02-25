import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { getRootUrl } from "../../helpers/helpers";

const rootUrl = getRootUrl();

function DisplayResult(props: any) {
  const [fairpriceProducts, setFairpriceProducts] = useState([]);
  const [giantProducts, setGiantProducts] = useState([]);
  const [coldstorageProducts, setColdstorageProducts] = useState([]);

  const [fairpricePage, setFairpricePage] = useState(0);
  const [giantPage, setGiantPage] = useState(0);
  const [coldstoragePage, setColdstoragePage] = useState(0);

  const [fairpriceProductsChecked, setFairpriceProductsChecked] =
    useState(false);
  const [giantProductsChecked, setGiantProductsChecked] = useState(false);
  const [coldstorageProductsChecked, setColdstorageProductsChecked] =
    useState(false);

  useEffect(() => {
    if (props.searchKeyword) {
      getFairpriceProducts(props.searchKeyword);
      getGiantProducts(props.searchKeyword);
      getColdstorageProducts(props.searchKeyword);
    }
  }, [props.searchKeyword]);

  useEffect(() => {
    if (props.searchKeyword) {
      getFairpriceProducts(props.searchKeyword, fairpriceProductsChecked);
    }
  }, [props.searchKeyword, fairpriceProductsChecked]);

  useEffect(() => {
    if (props.searchKeyword) {
      getGiantProducts(props.searchKeyword, giantProductsChecked);
    }
  }, [props.searchKeyword, giantProductsChecked]);

  useEffect(() => {
    if (props.searchKeyword) {
      getColdstorageProducts(props.searchKeyword, coldstorageProductsChecked);
    }
  }, [props.searchKeyword, coldstorageProductsChecked]);

  const getFairpriceProducts = async (
    searchKeyword: string,
    fairpriceProductsChecked?: boolean
  ) => {
    let params = {
      search_keyword: searchKeyword,
    };
    if (fairpricePage > 0) {
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
    giantProductsChecked?: boolean
  ) => {
    let params = {
      search_keyword: searchKeyword,
    };
    if (giantPage > 0) {
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
    coldstorageProductsChecked?: boolean
  ) => {
    let params = {
      search_keyword: searchKeyword,
    };
    if (coldstoragePage > 0) {
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

  const renderFairpriceProducts = (fairpriceProducts: any[]) => {
    let fairpriceProductsDiv: any[] = [];

    if (fairpriceProducts) {
      fairpriceProductsDiv = fairpriceProducts.map(
        (product: any, i: number) => {
          return (
            <Card key={i} className="my-4 p-4">
              <CardMedia
                component="img"
                height="150"
                image={product.images[0]}
                alt=""
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="h4">${product.price}</Typography>
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
            <CardMedia
              component="img"
              height="150"
              image={product.images[0]}
              alt=""
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {product.name}
              </Typography>
              <Typography variant="h4">${product.price}</Typography>
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
              <CardMedia
                component="img"
                height="150"
                image={product.images[0]}
                alt=""
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="h4">${product.price}</Typography>
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
              {renderColdstorageProducts(coldstorageProducts)}
            </Grid>
          </Grid>
        </div>
      );
    }

    return gridColumns;
  };

  return <div>{renderGridColumns()}</div>;
}

export default DisplayResult;