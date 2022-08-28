import React, { lazy, Suspense, useContext } from "react";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import AuthLoading from "./components/layout/AuthLoading";
import Layout from "./components/layout/Layout";
import Loading from "./components/layout/Loading";
import { AuthContext } from "./contexts/Auth";

const Home = lazy(async () => await import("./pages/Home"));
const SignIn = lazy(async () => await import("./pages/SignIn"));
const SignUp = lazy(async () => await import("./pages/SignUp"));

const Router: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <Route
            path="/editor"
            element={
              <Suspense fallback={<Loading />}>
                <SignIn />
              </Suspense>
            }
          />
        ) : (
          <>
            <Route
              path="/signup"
              element={
                <Suspense fallback={<AuthLoading />}>
                  <SignUp />
                </Suspense>
              }
            />
            <Route
              path="/signin"
              element={
                <Suspense fallback={<AuthLoading />}>
                  <SignIn />
                </Suspense>
              }
            />
          </>
        )}
        <Route element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
