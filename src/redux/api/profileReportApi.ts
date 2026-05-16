import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const profileReportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProfileReports: builder.query({
      query: (params) => ({
        url: "/review/admin/reports",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.profileReport],
    }),
    deleteProfileReport: builder.mutation({
      query: (id) => ({
        url: `/review/admin/remove/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.profileReport],
    }),
    // Add more endpoints specific to profileReportApi
  }),
});

export const {
  useGetAllProfileReportsQuery,
  useDeleteProfileReportMutation,
} = profileReportApi;