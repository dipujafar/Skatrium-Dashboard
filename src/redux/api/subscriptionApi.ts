import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubscription: builder.mutation({
      query: (data) => ({
        url: "/plans/create-subplan",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.subscription],
    }),
  }),
});

export const { useCreateSubscriptionMutation } = userApi;
