import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const eventCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEventCategory: builder.query({
      query: (params) => ({
        url: "/catagore/getAllCategories",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.eventCategory],
    }),
    createEventCategory: builder.mutation({
      query: (data) => ({
        url: "/catagore/categories-event",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.eventCategory],
    }),
    deleteEventCategory: builder.mutation({
      query: (id) => ({
        url: `/catagore/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.eventCategory],
    }),
  }),
});

export const {
  useGetAllEventCategoryQuery,
  useCreateEventCategoryMutation,
  useDeleteEventCategoryMutation,
} = eventCategoryApi;
