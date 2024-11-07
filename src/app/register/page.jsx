"use client";
import React from "react";
import RegisterCard from "../components/register";
import { Provider } from "react-redux";
import store from "../store";

export default function Register() {
  return (
    <Provider store={store}>
      <div>
        <RegisterCard />
      </div>
    </Provider>
  );
}
