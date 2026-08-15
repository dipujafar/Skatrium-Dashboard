import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export interface Faq {
  _id: string;
  question: string;
  answer: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateFaqPayload {
  question: string;
  answer: string;
}

export interface UpdateFaqPayload extends CreateFaqPayload {
  id: string;
}

// Matches the API response shape: { data: Faq[] }
export interface FaqsResponse {
  data: Faq[];
}

const faqsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query<FaqsResponse, void>({
      query: () => ({
        url: "/faq/faqs",
        method: "GET",
      }),
      providesTags: [tagTypes.faqs],
    }),
    createFaq: builder.mutation<Faq, CreateFaqPayload>({
      query: (data) => ({
        url: "/faq/faqs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.faqs],
    }),
    updateFaq: builder.mutation<Faq, UpdateFaqPayload>({
      query: (data) => ({
        url: `/faq/faqs/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.faqs],
    }),
    deleteFaq: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `/faq/faqs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faqs],
    }),
  }),
});

export const {
  useGetFaqsQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqsApi;