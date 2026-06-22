"use client";

import { useEffect } from "react";
import { Modal, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Faq } from "@/redux/api/faqsApi"; // adjust import path to match your project

const faqSchema = z.object({
  question: z
    .string()
    .min(1, "Question is required")
    .max(300, "Keep the question under 300 characters"),
  answer: z
    .string()
    .min(1, "Answer is required")
    .max(2000, "Keep the answer under 2000 characters"),
});

export type FaqFormValues = z.infer<typeof faqSchema>;

interface FaqFormModalProps {
  open: boolean;
  mode: "create" | "edit";
  initialData?: Faq | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (values: FaqFormValues) => void;
}

export default function FaqFormModal({
  open,
  mode,
  initialData,
  loading,
  onClose,
  onSubmit,
}: FaqFormModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FaqFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: { question: "", answer: "" },
  });

  // Re-sync the form whenever the modal opens, so edit mode is
  // pre-filled and create mode always starts blank.
  useEffect(() => {
    if (open) {
      reset({
        question: initialData?.question ?? "",
        answer: initialData?.answer ?? "",
      });
    }
  }, [open, initialData, reset]);

  const submitHandler = (values: FaqFormValues) => {
    onSubmit(values);
  };

  return (
    <Modal
      // title={mode === "create" ? "Add FAQ" : "Edit FAQ"}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit(submitHandler)}
      okText={mode === "create" ? "Add FAQ" : "Save changes"}
      confirmLoading={loading}
      destroyOnClose
    >
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-4 pt-2"
      >
        <h4 className="text-lg font-semibold">{mode === "create" ? "Add FAQ" : "Edit FAQ"}</h4>
        
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-200">
            Question
          </label>
          <Controller
            name="question"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="e.g. Can I submit my own events?"
                status={errors.question ? "error" : ""}
                className="bg-transparent hover:bg-transparent focus:bg-transparent text-white"
              />
            )}
          />
          {errors.question && (
            <p className="mt-1 text-xs text-red-500">
              {errors.question.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-200">
            Answer
          </label>
          <Controller
            name="answer"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                rows={4}
                placeholder="Write a clear, concise answer"
                status={errors.answer ? "error" : ""}
                className="bg-transparent hover:bg-transparent focus:bg-transparent text-white"
              />
            )}
          />
          {errors.answer && (
            <p className="mt-1 text-xs text-red-500">
              {errors.answer.message}
            </p>
          )}
        </div>
      </form>
    </Modal>
  );
}