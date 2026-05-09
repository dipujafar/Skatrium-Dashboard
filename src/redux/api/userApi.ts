import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";
import { number } from "zod";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/user/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),

    getAllUser: builder.query({
      query: (params) => ({
        url: "/admin/allusers",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.user],
    }),

    getUsersByRole: builder.query({
      query: (params) => ({
        url: "/users/getby-roll",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.user],
    }),

    getUsersDetails: builder.query({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/user/profile",
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: [tagTypes.user],
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    blockedUser: builder.mutation({
      query: (id) => ({
        url: `/admin/block/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.user, tagTypes.dashboard],
    }),
    unBlockedUser: builder.mutation({
      query: (id) => ({
        url: `/admin/unblock/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.user, tagTypes.dashboard],
    }),
  }),

  overrideExisting: true,
});

export const {
  useCreateUserMutation,
  useGetAllUserQuery,
  useUpdateProfileMutation,
  useGetProfileQuery,
  useBlockedUserMutation,
  useUnBlockedUserMutation,
  useGetUsersByRoleQuery,
  useGetUsersDetailsQuery
} = userApi;
