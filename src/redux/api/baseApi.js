import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({

    // baseUrl: "http://192.168.12.160:7000/api",
    baseUrl: "http://137.184.184.228/api",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      console.log("9 baseApi", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Users", "Product", "faqs", "Settings", "Notifications", "Categories"],
  endpoints: () => ({}),
});

