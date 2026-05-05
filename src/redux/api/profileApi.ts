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
  }),
});

export const { useGetMyProfileQuery } = userApi;
