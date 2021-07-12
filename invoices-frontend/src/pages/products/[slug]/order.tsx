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

import { CreditCard, Order, Product } from "../../../models";
import { GetServerSideProps, NextPage } from "next";
import http from "../../../http";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/dist/client/router";
import { useSnackbar } from "notistack";

type Props = {
  product: Product;
};

const ProductOrderPage: NextPage<Props> = ({ product }) => {
  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: CreditCard) => {
    try {
      const { data: order } = await http.post<Order>("/orders", {
        credit_card: data,
        items: [
          {
            product_id: product.id,
            quantity: 1,
          },
        ],
      });
      router.push(`/orders/${order.id}`);
    } catch (error) {
      console.error(axios.isAxiosError(error) ? error.response?.data : error);

      enqueueSnackbar("Erro ao processar seu pedido.", { variant: "error" });
    }
  };

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField {...register("name")} required label="Nome" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("number")}
              required
              inputProps={{ maxLength: 16 }}
              label="Número do cartão"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("cvv")}
              required
              type="number"
              label="CVV"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  {...register("expiration_month")}
                  onChange={(e) =>
                    setValue("expiration_month", parseInt(e.target.value))
                  }
                  required
                  type="number"
                  label="Expiração mês"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register("expiration_year")}
                  onChange={(e) =>
                    setValue("expiration_year", parseInt(e.target.value))
                  }
                  required
                  type="number"
                  label="Expiração ano"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box marginTop={1}>
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
