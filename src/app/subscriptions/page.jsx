"use client";
import React, {lazy} from "react";
import Header from "../components/header";
import Footer from "../components/footer";
// import Cards from "../components/memberships";
const Cards = lazy(() => import("../components/memberships"))

import { Provider } from "react-redux";
import store from "../store";

export default function Plans() {
  return (
    <Provider store={store}>
      <div className="body">
        <Header />
        <Cards />
        <Footer />
      </div>
    </Provider>
  );
}
