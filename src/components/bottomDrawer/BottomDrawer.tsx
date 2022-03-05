import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import StorefrontIcon from "@mui/icons-material/Storefront";

type Anchor = "top" | "left" | "bottom" | "right";

function BottomDrawer(props: any) {
  const [supermarketList, setSupermarketList] = useState([
    "Fairprice",
    "Giant",
    "Coldstorage",
    "Shengsiong",
    "Redmart",
  ]);

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={() => props.toggleDrawer(false)}
      onKeyDown={() => props.toggleDrawer(false)}
    >
      <List>{renderListItem(supermarketList)}</List>
    </Box>
  );

  const renderListItem = (supermarketList: string[]) => {
    let listItem = null;

    if (supermarketList) {
      listItem = supermarketList.map((supermarket: string, index: number) => {
        return (
          <ListItem button key={index}>
            <ListItemIcon>
              {index % 2 === 0 ? <LocalGroceryStoreIcon /> : <StorefrontIcon />}
            </ListItemIcon>
            <ListItemText
              primary={supermarket}
              onClick={() =>
                handleListItemClick(supermarket, props.searchKeyword)
              }
            />
          </ListItem>
        );
      });
    }

    return listItem;
  };

  const handleListItemClick = (supermarket: string, searchKeyword: string) => {
    if (supermarket && searchKeyword) {
      switch (supermarket) {
        case "Fairprice":
          window.open(
            `https://www.fairprice.com.sg/search?query=${searchKeyword}`
          );
          break;
        case "Giant":
          window.open(`https://giant.sg/search?q=${searchKeyword}`);
          break;
        case "Coldstorage":
          window.open(`https://coldstorage.com.sg/search?q=${searchKeyword}`);
          break;
        case "Shengsiong":
          window.open(`https://shengsiong.com.sg/search/${searchKeyword}`);
          break;
        case "Redmart":
          window.open(`https://www.lazada.sg/catalog/?q=${searchKeyword}`);
          break;
        default:
          break;
      }
    }
  };

  return (
    <Drawer
      anchor="bottom"
      open={props.open}
      onClose={() => props.toggleDrawer(false)}
    >
      {list("bottom")}
    </Drawer>
  );
}

export default BottomDrawer;
