import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const productReportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProductReports: builder.query({
      query: (params) => ({
        url: "/ProductReport/admin/get-product-reports",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.productReport],
    }),
    deleteProductReport: builder.mutation({
      query: (id) => ({
        url: `/ProductReport/admin/reports/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.productReport],
    }),
  }),
});

export const { useGetAllProductReportsQuery, useDeleteProductReportMutation } =
  productReportApi;
