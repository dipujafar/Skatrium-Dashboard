import { baseApi } from "./baseApi";

const subscriptionEmailApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionUsers: builder.query({
      query: (params) => ({
        url: "/users/subscribe-email",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetSubscriptionUsersQuery } = subscriptionEmailApi;
