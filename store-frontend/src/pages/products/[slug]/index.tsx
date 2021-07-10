import Head from "next/head";

import {
  Button,
  Typography,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  CardHeader,
} from "@material-ui/core";

import { Product } from "../../../models";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import http from "../../../http";
import axios from "axios";
import Link from "next/link";

type Props = {
  product: Product;
};

const ProductDetailPage: NextPage<Props> = ({ product }) => {
  return (
    <div>
      <Head>
        <title>{product.name} - Detalhes do produto</title>
      </Head>
      <Card>
        <CardHeader
          title={product.name.toUpperCase()}
          subheader={`R$ ${product.price}`}
        />
        <CardActions>
          <Link
            href="/products/[slug]/order"
            as={`/products/${product.slug}/order`}
            passHref
          >
            <Button size="small" color="primary" component="a">
              Comprar
            </Button>
          </Link>
        </CardActions>
        <CardMedia style={{ paddingTop: "56%" }} image={product.image_url} />
        <CardContent>
          <Typography component="p" variant="body2" color="textSecondary">
            {product.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetailPage;

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async (
  context
) => {
  const { slug } = context.params!;
  console.log("chegou aqui");
  try {
    const { data: product } = await http.get(`/products/${slug}`);
    return {
      props: {
        product,
      },
      revalidate: 1 * 60 * 2,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { notFound: true };
    }
    throw error;
  }
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const { data: products } = await http.get("/products");
  const paths = products.map((product: Product) => ({
    params: {
      slug: product.slug,
    },
  }));
  return { paths, fallback: "blocking" };
};
