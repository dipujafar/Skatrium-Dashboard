import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardPageData: builder.query({
      query: (params) => ({
        url: "/admin/dashboard",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.dashboard],
    }),
  }),
});

export const { useGetDashboardPageDataQuery } = dashboardApi;
