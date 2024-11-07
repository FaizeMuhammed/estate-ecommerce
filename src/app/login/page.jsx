"use client";
import React from "react";
import Login from "../components/login";
import { Provider } from "react-redux";
import store from "../store";

export default function LoginPage() {
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  );
}
