import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContentData: builder.query({
      query: (params) => ({
        url: "/Settings/data",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.content],
    }),
    updateSettings: builder.mutation({
      query: (data) => ({
        url: "/Settings/create",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.content],
    })
  }),
});

export const { useGetContentDataQuery, useUpdateSettingsMutation } = contentApi;
