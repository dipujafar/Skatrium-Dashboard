import { baseApi } from "./baseApi";

const eventReportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEventReport: builder.query({
      query: (params) => ({
        url: "/eventreport/admin/reports",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetAllEventReportQuery } = eventReportsApi;
