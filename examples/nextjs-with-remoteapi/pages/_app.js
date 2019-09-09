import { getInitialProps, getComponent } from "@ekino/rendr-rendering-nextjs";

import RendrPage from "./_rendr";
import App from "next/app";

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    // with call the initial props from RendrPage
    // and return the valid settings for the page generation.
    return getInitialProps(RendrPage, { Component, ctx });
  }

  render() {
    // load the component from the client's props
    const { Component, pageProps } = getComponent(RendrPage, this.props);

    return <Component {...pageProps} />;
  }
}
