"use client";
import React from "react";
import AddPage from "../components/addCard";
import Header from "../components/header";
import Footer from "../components/footer";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../store";
import { Provider } from "react-redux";

export default function Upload() {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <AddPage />
          <Footer />
        </PersistGate>
      </Provider>
    </div>
  );
}
