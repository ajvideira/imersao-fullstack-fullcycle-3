import Head from "next/head";

import {
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  TextField,
  Button,
  Grid,
  Box,
} from "@material-ui/core";

import { Product } from "../../../models";
import { GetServerSideProps, NextPage } from "next";
import http from "../../../http";
import axios from "axios";

type Props = {
  product: Product;
};

const ProductOrderPage: NextPage<Props> = ({ product }) => {
  return (
    <div>
      <Head>
        <title>Pagamento</title>
      </Head>
      <Typography component="h1" variant="h3" color="textPrimary" gutterBottom>
        Checkout
      </Typography>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={product.image_url} />
        </ListItemAvatar>
        <ListItemText
          primary={product.name}
          secondary={`R$ ${product.price}`}
        />
      </ListItem>
      <Typography component="h2" variant="h6" gutterBottom>
        Pague com cartão de crédito
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField required label="Nome" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              inputProps={{ maxLength: 16 }}
              label="Número do cartão"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField required type="number" label="CVV" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  required
                  type="number"
                  label="Expiração mês"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  type="number"
                  label="Expiração ano"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box marginTop={3}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Pagar
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default ProductOrderPage;

export const getServerSideProps: GetServerSideProps<Props, { slug: string }> =
  async (context) => {
    const { slug } = context.params!;

    try {
      const { data: product } = await http.get(`/products/${slug}`);
      return {
        props: {
          product,
        },
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { notFound: true };
      }
      throw error;
    }
  };
