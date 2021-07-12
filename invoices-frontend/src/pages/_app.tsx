import {
  Box,
  Container,
  CssBaseline,
  MuiThemeProvider,
} from "@material-ui/core";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider>
        <CssBaseline />
        <Navbar />
        <Container>
          <Box marginTop={1}>
            <Component {...pageProps} />
          </Box>
        </Container>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
}
export default MyApp;
