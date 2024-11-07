"use client";
import React from "react";
import Chat from "../components/chat";
import { Provider } from "react-redux";
import store from "../store";

export default function ChatPage() {
  return (
    <Provider store={store}>
      <div className="body">
        <Chat />
      </div>
    </Provider>
  );
}
