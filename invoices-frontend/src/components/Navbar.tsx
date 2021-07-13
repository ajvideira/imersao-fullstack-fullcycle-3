import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import Link from "next/link";
import React from "react";
import StoreIcon from "@material-ui/icons/Store";

export const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/" as="/" passHref>
          <Button color="inherit" startIcon={<StoreIcon />} component="a">
            <Typography variant="h6">Code Invoice</Typography>
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
