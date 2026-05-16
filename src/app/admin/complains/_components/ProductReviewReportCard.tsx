import { Star, Images, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Image } from "antd";
import { toast } from "sonner";
import { useDeleteProductReportMutation } from "@/redux/api/productReportApi";
import ComplainsProductReportModal from "@/components/modal/ComplainsProductReviewModal";

interface ProductReportCardProps {
  report: any;
}

const ProductReportCard = ({ report }: ProductReportCardProps) => {
  const productData = report?.product || {};
  const reviewData = report?.review || {};
  const [open, setOpen] = useState<boolean>(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [productPreviewVisible, setProductPreviewVisible] = useState(false);

  const reviewImages: { url: string; _id: string }[] = reviewData?.images || [];
  const productImage = productData?.images?.[0]?.url;

  const [deleteProductReport, { isLoading: isDeleting }] = useDeleteProductReportMutation();

  const handleRemove = async () => {
    try {
      await deleteProductReport(report?._id).unwrap();
      toast.success("Report removed successfully");
      setOpen(false);
    } catch {
      toast.error("Failed to remove report");
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${
          i < Math.floor(rating)
            ? "fill-[#FFBA49] text-[#FFBA49]"
            : "fill-muted text-muted"
        }`}
      />
    ));
  };

  return (
    <>
      <div className="bg-white/10 rounded-xl overflow-hidden w-full max-w-sm border border-white/20 shadow-xl text-white">
        {/* Product Image Section */}
        <div className="relative w-full h-56">
          {/* Native img for layout; clicking opens Ant Design preview */}
          <img
            src={productImage || "/default_banner_image.png"}
            alt={productData?.name}
            className="w-full h-full object-cover block cursor-pointer"
            onClick={() => setProductPreviewVisible(true)}
          />
          {/* Hidden Ant Image — provides the lightbox preview */}
          <div className="hidden">
            <Image
              src={productImage}
              preview={{
                visible: productPreviewVisible,
                onVisibleChange: (vis) => setProductPreviewVisible(vis),
              }}
            />
          </div>
          {/* Price Badge */}
          <div className="absolute bottom-3 left-3 bg-[#FA9416] text-primary-foreground px-2.5 py-0.5 rounded-md text-sm font-semibold">
            ${productData?.price?.toFixed(1)}
          </div>
        </div>

        {/* Product Details */}
        <div className="p-3 space-y-2">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#FA9416]" />
            <h3 className="text-lg font-semibold">{productData?.name}</h3>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Review Section */}
          <div className="flex items-start gap-2">
            <Image
              src={reviewData?.user?.image?.url}
              height={42}
              width={42}
              className="border border-main-color size-16 !rounded-full"
              fallback={`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='34' height='34'><circle cx='17' cy='17' r='17' fill='%2300BFA5'/><text x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-size='14' font-weight='600' fill='white'>${reviewData?.user?.fullName?.charAt(0)}</text></svg>`}
              preview={false}
            />

            <div className="flex-1 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-medium text-white text-sm">
                  {reviewData?.user?.fullName}
                </span>
                <div className="flex items-center gap-1">
                  <div className="flex">{renderStars(reviewData?.rating)}</div>
                  <span className="text-muted-foreground text-xs">
                    {reviewData?.rating}/5
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-300">{reviewData?.user?.email}</p>
            </div>
          </div>

          {/* Comment + Image Preview Icon */}
          <div className="flex items-start justify-between gap-2">
            <p className="text-[#CBD5E1] text-sm leading-relaxed flex-1">
              {reviewData?.comment}
            </p>

            {reviewImages.length > 0 && (
              <button
                onClick={() => {
                  setPreviewIndex(0);
                  setPreviewVisible(true);
                }}
                className="flex-shrink-0 mt-0.5 flex items-center gap-1 text-[#CBD5E1] hover:text-white transition-colors"
                title={`View ${reviewImages.length} image${reviewImages.length > 1 ? "s" : ""}`}
              >
                <Images className="w-5 h-5" />
                <span className="text-xs font-medium">
                  {reviewImages.length} {reviewImages.length === 1 ? "image" : "images"}
                </span>
              </button>
            )}
          </div>

          {/* Hidden Ant Design Image.PreviewGroup */}
          <div className="hidden">
            <Image.PreviewGroup
              preview={{
                visible: previewVisible,
                current: previewIndex,
                onVisibleChange: (vis) => setPreviewVisible(vis),
              }}
            >
              {reviewImages.map((img, idx) => (
                <Image key={idx} src={img.url} />
              ))}
            </Image.PreviewGroup>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1 bg-[#222222] border-none"
              onClick={() => setOpen(true)}
            >
              View report
            </Button>
            <Button
              variant="destructive"
              disabled={isDeleting}
              className="flex-1 bg-[#FF484830]/[0.2] hover:bg-[#FF484830]/[0.4] text-[#FF4848] border-none disabled:opacity-50"
              onClick={handleRemove}
            >
              {isDeleting ? "Removing..." : "Remove"}
            </Button>
          </div>
        </div>
      </div>

      <ComplainsProductReportModal
        open={open}
        setOpen={setOpen}
        report={report}
        onRemove={handleRemove}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default ProductReportCard;