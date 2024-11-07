"use client";
import React from "react";
import Wishlist from "../components/wishlist";
import Header from "../components/header";
import Footer from "../components/footer";
import { Provider } from "react-redux";
import store from "../store";

export default function WishlistPage() {
  return (
    <div className="body ">
      <Provider store={store}>
        <Header />
        <Wishlist />
        <Footer />
      </Provider>
    </div>
  );
}
