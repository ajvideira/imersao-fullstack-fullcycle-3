import Head from "next/head";
import Link from "next/link";
import {
  Button,
  Typography,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Grid,
} from "@material-ui/core";

import { GetServerSideProps, NextPage } from "next";
import { Product } from "../models";
import http from "../http";

type Props = {
  products: Product[];
};

const Page404: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Página não encontrada</title>
      </Head>
      <Typography
        component="h1"
        variant="h4"
        color="textPrimary"
        align="center"
        gutterBottom
      >
        404 - Página não encontrada
      </Typography>
    </div>
  );
};

export default Page404;
