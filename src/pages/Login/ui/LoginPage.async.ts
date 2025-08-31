import { lazy } from "react";

export const LoginPageAsync = lazy(
  () =>
    new Promise((resolve) => {
        //@ts-expect-error simulate delay
      setTimeout(() => resolve(import("./LoginPage")), 1500);
    })
);
