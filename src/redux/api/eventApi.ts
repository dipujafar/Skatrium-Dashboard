import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEventData: builder.query({
      query: (params) => ({
        url: "/event",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.dashboard],
    }),
  }),
});

export const { useGetAllEventDataQuery } = eventApi;
