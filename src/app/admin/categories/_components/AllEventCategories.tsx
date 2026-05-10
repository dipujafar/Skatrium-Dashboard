"use client"
import { useDeleteEventCategoryMutation, useGetAllEventCategoryQuery } from '@/redux/api/eventCategoryApi'
import { getActualError } from '@/utils/handleError'
import { Trash2 } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

interface EventCategory {
    _id: string
    name: string
    image: string
    description: string
    isActive: boolean
    isPopular: boolean
    createdAt: string
    updatedAt: string
    eventCount: number
}

export default function AllEventCategories() {
    const { data, isLoading } = useGetAllEventCategoryQuery({ limit: 999 });
    const [deleteCategory] = useDeleteEventCategoryMutation();

    const categories: EventCategory[] = data?.data ?? data ?? []

    const handleDelete = async (id: string) => {
        try {
            await deleteCategory(id).unwrap();
            toast.success("Success deleted the category")
        } catch (err: any) {
            const errMessage = getActualError(err);
            toast.error(errMessage || "Failed")
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-[calc(100vh-250px)] bg-zinc-900 p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="rounded-xl overflow-hidden bg-[#1a1a1a] animate-pulse">
                            <div className="aspect-[4/3] bg-[#2a2a2a]" />
                            <div className="p-3">
                                <div className="h-4 w-3/4 bg-[#2a2a2a] rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-[calc(100vh-250px)] bg-zinc-900 rounded p-6">
            <div className="mb-5">
                <h1
                    className="text-2xl font-bold text-white tracking-tight"
                    style={{ fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif", letterSpacing: '0.05em' }}
                >
                    EVENT CATEGORIES
                </h1>
                <p className="text-[#666] text-sm mt-1">
                    {categories.length} {categories.length === 1 ? 'category' : 'categories'} available
                </p>
            </div>

            {categories.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-[#fff]">
                    <svg className="w-12 h-12 mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7h18M3 12h18M3 17h18" />
                    </svg>
                    <p className="text-sm">No categories found</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {categories.map((category) => (
                        <CategoryCard key={category._id} category={category} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    )
}

function CategoryCard({ category, onDelete }: { category: EventCategory; onDelete: (id: string) => void }) {
    const [confirming, setConfirming] = React.useState(false)

    const handleTrashClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setConfirming(true)
    }

    const handleConfirmDelete = (e: React.MouseEvent) => {
        e.stopPropagation()
        onDelete(category._id)
        setConfirming(false)
    }

    const handleCancelDelete = (e: React.MouseEvent) => {
        e.stopPropagation()
        setConfirming(false)
    }

    return (
        <div className="group relative rounded-xl overflow-hidden bg-zinc-900 cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            <div className="aspect-[4/3] relative overflow-hidden">
                <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                            'https://placehold.co/400x300/1a1a1a/444?text=No+Image'
                    }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Top-right controls */}
                <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                    {confirming ? (
                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={handleCancelDelete}
                                className="text-[11px] font-semibold bg-[#2a2a2a] text-[#aaa] hover:text-white px-2 py-1 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="text-[11px] font-semibold bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded-lg transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Trash icon — visible only on card hover */}
                            <button
                                onClick={handleTrashClick}
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/60 hover:bg-red-600 text-white rounded-lg p-1.5"
                                title="Delete category"
                            >
                                <Trash2 size={18} />
                            </button>


                        </>
                    )}
                </div>

                {/* Name on image */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-sm font-semibold leading-tight drop-shadow-md">
                        {category.name}
                    </p>
                    {category.eventCount > 0 && (
                        <p className="text-[#aaa] text-[11px] mt-0.5">
                            {category.eventCount} {category.eventCount === 1 ? 'event' : 'events'}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}