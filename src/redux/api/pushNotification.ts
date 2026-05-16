import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const pushNotificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPushNotification: builder.query({
            query: (params) => ({
                url: "/notifications",
                method: "GET",
                params,
            }),
            providesTags: [tagTypes.pushNotification],
        }),
        sendPushNotification: builder.mutation({
            query: (body) => ({
                url: "/notifications/send",
                method: "POST",
                body,
            }),
            invalidatesTags: [tagTypes.pushNotification],
        }),
    }),
});

export const { useGetPushNotificationQuery, useSendPushNotificationMutation } =
    pushNotificationApi;