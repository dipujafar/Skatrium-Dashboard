"use client";

import { useState } from "react";
import { Button, Popconfirm, Skeleton, Empty, Collapse, message } from "antd";
import { Plus, Pencil, Trash2, HelpCircle, ChevronDown } from "lucide-react";
import {
  useGetFaqsQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
  type Faq,
} from "@/redux/api/faqsApi"; // adjust import path to match your project
import FaqFormModal, { type FaqFormValues } from "./FaqFormModal";

export default function FAQsContainer() {
  const { data: faqsResponse, isLoading } = useGetFaqsQuery();
  const faqs = faqsResponse?.data;

  const [createFaq, { isLoading: isCreating }] = useCreateFaqMutation();
  const [updateFaq, { isLoading: isUpdating }] = useUpdateFaqMutation();
  const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [activeFaq, setActiveFaq] = useState<Faq | null>(null);

  const openCreateModal = () => {
    setModalMode("create");
    setActiveFaq(null);
    setModalOpen(true);
  };

  const openEditModal = (faq: Faq) => {
    setModalMode("edit");
    setActiveFaq(faq);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSubmit = async (values: FaqFormValues) => {
    try {
      if (modalMode === "create") {
        await createFaq(values).unwrap();
        message.success("FAQ added");
      } else if (activeFaq) {
        await updateFaq({ id: activeFaq?._id, ...values }).unwrap();
        message.success("FAQ updated");
      }
      setModalOpen(false);
    } catch {
      message.error("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFaq(id).unwrap();
      message.success("FAQ deleted");
    } catch {
      message.error("Failed to delete FAQ");
    }
  };

  return (
    <div className="rounded-xl   shadow-sm text-white">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold ">Frequently Asked Questions</h2>
        </div>
        <Button
          type="primary"
          icon={<Plus className="h-4 w-4" />}
          onClick={openCreateModal}
          className="flex items-center"
        >
          Add FAQ
        </Button>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} active paragraph={{ rows: 2 }} />
          ))}
        </div>
      ) : !faqs || faqs.length === 0 ? (
        <Empty description="No FAQs yet. Add your first one." />
      ) : (
        <Collapse
          style={{ color: "white" }}
          // The first FAQ is expanded by default; the rest stay collapsed.
          defaultActiveKey={[faqs[0]?._id]}
          expandIconPosition="end"
          expandIcon={({ isActive }) => (
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transition-transform ${
                isActive ? "rotate-180" : ""
              }`}
            />
          )}
          items={faqs.map((faq) => ({
            key: faq?._id,
            label: (
              <span className="font-medium text-white">{faq.question}</span>
            ),
            children: (
              <p className="text-sm leading-relaxed text-gray-800">
                {faq.answer}
              </p>
            ),
            extra: (
              // Stop propagation so clicking these buttons doesn't
              // also toggle the panel open/closed.
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1"
              >
                {/* <button
                  type="button"
                  onClick={() => openEditModal(faq)}
                  className="rounded-md p-2 text-gray-200 hover:bg-gray-100 hover:text-blue-600"
                  aria-label="Edit FAQ"
                >
                  <Pencil className="h-4 w-4" />
                </button> */}
                <Popconfirm
                  title="Delete this FAQ?"
                  description="This action can't be undone."
                  okText="Delete"
                  okButtonProps={{ danger: true, loading: isDeleting }}
                  onConfirm={() => handleDelete(faq?._id)}
                >
                  <button
                    type="button"
                    className="rounded-md p-2 bg-red-500 text-white  hover:bg-red-50 hover:text-red-600"
                    aria-label="Delete FAQ"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </Popconfirm>
              </div>
            ),
          }))}
        />
      )}

      <FaqFormModal
        open={modalOpen}
        mode={modalMode}
        initialData={activeFaq}
        loading={isCreating || isUpdating}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
