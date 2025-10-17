import Typography from "@/libs/typography";
import React from "react";


interface NewsCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  index?: number;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  title,
  description,
  imageUrl,
  index,
}) => {
  const shortText =
    description && description.length > 70
      ? description.slice(0, 70) + "..."
      : description;

  const shortTitle =
    title && title.length > 60 ? title.slice(0, 60) + "..." : title;

  const fallbackImage =
    "https://images.unsplash.com/vector-1760269906509-708ad011614f?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=3216";

  return (
    <div
      key={`news-index-${title}-${index}`}
      className="w-[350px] h-[350px] border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
    >
      <div className="h-[200px] w-full">
        <img
          src={imageUrl || fallbackImage}
          alt={title ?? "news image"}
          className="object-cover h-full w-full"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = fallbackImage;
          }}
        />
      </div>

      <div className="p-4 space-y-2">
        <Typography.Text className="font-semibold">
          {shortTitle}
        </Typography.Text>
        <Typography.SubText>{shortText}</Typography.SubText>
      </div>
    </div>
  );
};
