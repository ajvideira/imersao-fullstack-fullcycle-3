import Head from "next/head";

import {
  Typography,
  MenuItem,
  Select,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";

import { CreditCard, Invoice } from "../../models";
import { GetStaticProps, NextPage } from "next";
import http from "../../http";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { useEffect } from "react";

type Props = {
  creditCards: CreditCard[];
};

const InvoicesListPage: NextPage<Props> = ({ creditCards }) => {
  const [creditCardNumber, setCreditCardNumber] = useState<string>(
    creditCards.length ? creditCards[0].number : ""
  );

  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await http.get<Invoice[]>(
        `/credit-cards/${creditCardNumber}/invoices`
      );
      setInvoices(data);
    })();
  }, [creditCardNumber]);

  if (!creditCards.length) {
    return (
      <div>
        <Head>
          <title>Fatura - Nenhum cartão encontrado</title>
        </Head>
        <Typography component="h1" variant="h3" color="textPrimary">
          Nenhum cartão encontrado
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Fatura - {creditCardNumber}</title>
      </Head>
      <Typography component="h1" variant="h3" color="textPrimary" gutterBottom>
        Fatura
      </Typography>
      <Select
        label="Cartão de crédito"
        defaultValue={creditCards[0].number}
        onChange={(e) => setCreditCardNumber(e.target.value as string)}
      >
        {creditCards.map((creditCard) => (
          <MenuItem key={creditCard.number} value={creditCard.number}>
            {creditCard.number}
          </MenuItem>
        ))}
      </Select>
      <Grid container>
        <Grid item xs={12} sm={3}>
          <List>
            {invoices.map((invoice) => (
              <ListItem key={invoice.id} alignItems="flex-start">
                <ListItemText
                  primary={format(parseISO(invoice.payment_date), "dd/MM/yyyy")}
                  secondary={invoice.store}
                />
                <ListItemSecondaryAction>
                  R$ {invoice.amount}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default InvoicesListPage;

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { data: creditCards } = await http.get(`/credit-cards`);
  return {
    props: {
      creditCards,
    },
    revalidate: 1,
  };
};
