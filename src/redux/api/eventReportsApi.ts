import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const eventReportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEventReport: builder.query({
      query: (params) => ({
        url: "/eventreport/admin/reports",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.eventReport]
    }),
    deleteEventReport: builder.mutation({
      query: (id) => ({
        url: `/eventreport/admin/reports/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:[tagTypes.eventReport]
    }),
  }),
});

export const { useGetAllEventReportQuery, useDeleteEventReportMutation } =
  eventReportsApi;
