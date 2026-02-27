'use client';
import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type ProductCardModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

const ComplainsProductReviewModal = ({ open, setOpen }: ProductCardModalProps) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative bg-[#1a1a1a] rounded-2xl p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 p-1 hover:bg-zinc-700 rounded-full transition"
                >
                    <X className="w-5 h-5 text-white" />
                </button>

                {/* Product Image */}
                <div className="relative overflow-hidden rounded-xl mb-4  bg-black mt-5">
                    <Image
                        src="/product_image.png"
                        alt="Product Image"
                        width={400}
                        height={280}
                        className="w-full h-[280px] object-contain"
                    />
                </div>

                {/* Product Title and Price */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white mb-2 max-w-xs">ProSkate Elite Performance Shoe</h1>
                    <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-orange-400">$129.99</span>
                        <span className="text-lg text-zinc-400 line-through">$179.00</span>
                        <span className="text-green-400 font-semibold">28% OFF</span>
                    </div>
                </div>

                {/* Product Description */}
                <div className="mb-2">
                    <h2 className="text-lg font-semibold text-white mb-1">Product Description</h2>
                    <p className="text-zinc-300 text-sm mb-2">
                        Elevate your skating experience with the ProSkate Elite Performance Shoe. Engineered for both amateur and professional skaters, this shoe combines cutting-edge technology with superior comfort.
                    </p>
                    <p className="text-zinc-300 text-sm">
                        The reinforced ankle support and shock-absorbing sole provide maximum stability during high-intensity movement, while the breathable mesh upper keeps your feet cool and dry.
                    </p>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-zinc-700">
                    <Image
                        src="/user_image.jpg"
                        alt="Jack Robo"
                        width={44}
                        height={44}
                        className="w-11 h-11 rounded-full object-cover bg-zinc-700"
                    />
                    <h3 className="text-white font-semibold">Jack Robo</h3>
                </div>

                {/* Reason For Report */}
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-white mb-3">Reason For report</h2>
                    <div className="bg-red-950 border border-red-700 rounded-xl p-2 flex items-center gap-3">
                        <div className="bg-red-900 p-2 rounded-md flex-shrink-0 mt-0.5">
                            <AlertCircle className="w-4 h-4 text-red-300" />
                        </div>
                        <p className="text-red-200 text-sm">Just to let you know this might be a problem</p>
                    </div>
                </div>

                {/* Remove Post Button */}
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-6 rounded-full transition">
                    Remove Post
                </Button>
            </div>
        </div>
    );
};

export default ComplainsProductReviewModal;
