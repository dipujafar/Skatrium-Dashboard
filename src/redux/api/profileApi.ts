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
      query: () => ({
        url: "/admin/update-profile",
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.profile],
    }),
  }),
});

export const { useGetMyProfileQuery, useUpdateAdminProfileMutation } = userApi;
