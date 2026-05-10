'use client';;
import { Trash2 } from 'lucide-react';
import { useDeleteProductCategoryMutation, useGetAllProductCategoryQuery } from '@/redux/api/productCategoryApi';
import { Spin } from 'antd';
import { toast } from 'sonner';
import EmptyData from '@/components/shared/EmptyData';

export function AllCategories() {
  const { data, isLoading } = useGetAllProductCategoryQuery({ limit: 999 });
  const [deleteProductCategory] = useDeleteProductCategoryMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteProductCategory(id).unwrap();
      toast.success("Successfully deleted this product category");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete ");
    }
  };


  if (isLoading) return <div className="flex justify-center items-center min-h-[calc(100vh-250px)]"><Spin size="large" /></div>

  if (data?.data?.length === 0) {
    return <EmptyData message='No product found' />
  }

  return (
    <div className="w-full bg-zinc-900 p-4 rounded-md">
      <div className="mb-5">
        <h1
          className="text-2xl font-bold text-white tracking-tight"
          style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif", letterSpacing: '0.05em' }}
        >
          PRODUCT CATEGORIES
        </h1>
        <p className="text-[#666] text-sm mt-1">
          {data?.data?.length} {data?.data?.length === 1 ? 'category' : 'categories'} available
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {data?.data?.map((category: any) => (
          <div
            key={category?._id}
            className="relative group"
          >
            <button
              className="w-full px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition-colors duration-200 flex items-center justify-center text-sm font-medium"
            >
              {category?.name}
            </button>

            <button
              onClick={() => handleDelete(category._id)}
              className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 transition-colors shadow-lg hidden group-hover:block duration-500"
              aria-label={`Delete ${category.name}`}
            >
              <Trash2 size={16} />
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}
