"use client";
import React, {lazy, Suspense} from "react";
import Header from "../components/header";
import Profile from "../components/profile";
const Upload = lazy(() => import("../components/uploads"))

import AddPage from "../components/addCard";
import Footer from "../components/footer";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../store";
import Skelton from "../components/skeltonLoading";

export default function () {
  return (
    <div className="body">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Suspense  fallback={<Skelton />}>
          <Header />
          <Profile />
          <Suspense  fallback={<Skelton />}>
          <Upload />
          </Suspense>
          <Footer />
          </Suspense>
        </PersistGate>
      </Provider>
    </div>
  );
}
