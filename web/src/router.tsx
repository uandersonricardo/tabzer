import React, { lazy, Suspense, useContext } from "react";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Loading from "./components/common/Loading";
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
                <Suspense fallback={<Loading />}>
                  <SignUp />
                </Suspense>
              }
            />
            <Route
              path="/signin"
              element={
                <Suspense fallback={<Loading />}>
                  <SignIn />
                </Suspense>
              }
            />
          </>
        )}
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
