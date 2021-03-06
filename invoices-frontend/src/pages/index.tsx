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

const Home: NextPage<Props> = ({ products }) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography component="h1" variant="h3" color="textPrimary" gutterBottom>
        Produtos
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                style={{ paddingTop: "56%" }}
                image={product.image_url}
              />
              <CardContent>
                <Typography component="h2" variant="h5" gutterBottom>
                  {product.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Link
                  href="/products/[slug]"
                  as={`/products/${product.slug}`}
                  passHref
                >
                  <Button size="small" color="primary" component="a">
                    Detalhes
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { data: products } = await http.get("/products");

  return {
    props: {
      products,
    },
  };
};
