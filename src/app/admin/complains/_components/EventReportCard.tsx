import { Calendar, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ComplainsEventReportModal from "@/components/modal/ComplainsEventReportModal";
import { useState } from "react";

export interface EventReview {
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
}

export interface EventData {
  id: string;
  title: string;
  image: string;
  price: number;
  date: string;
  location: string;
  review: EventReview;
}

interface EventCardProps {
  event: EventData;
  onViewDetails?: (id: string) => void;
  onRemove?: (id: string) => void;
}

const EventReportCard = ({ event, onViewDetails, onRemove }: EventCardProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${i < Math.floor(rating)
            ? "fill-[#FFBA49] text-[#FFBA49]"
            : "fill-muted text-muted"
          }`}
      />
    ));
  };

  return (
    <>
      <div className="bg-white/10 rounded-xl overflow-hidden w-full max-w-sm border border-white/20 shadow-xl text-white">
        {/* Event Image Section */}
        <div className="relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-40 object-cover"
          />

          {/* Price Badge */}
          <div className="absolute bottom-3 left-3 bg-[#FA9416] text-primary-foreground px-2.5 py-0.5 rounded-md text-sm font-semibold">
            ${event.price.toFixed(1)}
          </div>
        </div>

        {/* Event Details */}
        <div className="p-4 space-y-3">
          <h3 className="text-lg font-semibold">
            {event.title}
          </h3>

          <div className="flex items-center gap-4 text-[#CBD5E1] text-sm">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>{event.location}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Review Section */}
          <div className="flex items-start gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={event.review.userAvatar} alt={event.review.userName} />
              <AvatarFallback className="bg-secondary text-secondary-foreground">
                {event.review.userName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-medium text-white text-sm">
                  {event.review.userName}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="flex">{renderStars(event.review.rating)}</div>
                  <span className="text-muted-foreground text-xs">
                    {event.review.rating.toFixed(1)}/5
                  </span>
                </div>
              </div>
              <p className="text-[#CBD5E1] text-sm leading-relaxed">
                {event.review.comment}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1 bg-[#222222] border-none"
              onClick={() => setOpen(true)}
            >
              View details
            </Button>
            <Button
              variant="destructive"
              className="flex-1 bg-[#FF484830]/[0.2] hover:bg-[#FF484830]/[0.4] text-[#FF4848] border-none"
              onClick={() => onRemove?.(event.id)}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
      <ComplainsEventReportModal open={open} setOpen={setOpen} />
    </>
  );
};

export default EventReportCard;
