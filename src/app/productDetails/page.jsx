"use client";
import React from "react";
import Details from "../components/viewProduct";
import Header from "../components/header";
import Footer from "../components/footer";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store, { persistor } from "../store";

export default function productDetails() {
  return (
    <div className="body">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <Details />
          <Footer />
        </PersistGate>
      </Provider>
    </div>
  );
}
