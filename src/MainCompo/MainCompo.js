import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Add from "../Components/Add/Add";
import PageNotFound from "../Components/PageNotFound/PageNotFound";
import Show from "../Components/Show/Show";

export default function MainCompo() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Add />,
    },
    {
      path: "/view",
      element: <Show />,
    },
    {
      path: "/*",
      element: <PageNotFound />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
