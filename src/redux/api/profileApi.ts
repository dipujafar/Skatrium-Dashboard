import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => ({
        url: "/admin/get-profile",
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),
    updateAdminProfile: builder.mutation({
      query: (data) => ({
        url: "/admin/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
  }),
});

export const { useGetMyProfileQuery, useUpdateAdminProfileMutation } = userApi;
