import { baseApi } from "./baseApi";

const productReportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProductReports: builder.query({
      query: (params) => ({
        url: "/ProductReport/admin/get-product-reports",
        method: "GET",
        params,
      }),
    }),
    deleteProductReport: builder.mutation({
      query: (id) => ({
        url: `/ProductReport/admin/reports/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetAllProductReportsQuery, useDeleteProductReportMutation } =
  productReportApi;
