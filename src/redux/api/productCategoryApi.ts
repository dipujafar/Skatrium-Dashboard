import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const productCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProductCategory: builder.query({
      query: (params) => ({
        url: "/same/product-category",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.productCategory],
    }),
    createProductCategory: builder.mutation({
      query: (data) => ({
        url: "/same/create-category-product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.productCategory],
    }),
    deleteProductCategory: builder.mutation({
      query: (id) => ({
        url: `/same/product-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.productCategory],
    }),
  }),
});

export const {
  useGetAllProductCategoryQuery,
  useCreateProductCategoryMutation,
  useDeleteProductCategoryMutation,
} = productCategoryApi;
