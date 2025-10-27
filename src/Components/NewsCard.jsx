import React, { useMemo, useState } from "react";
import { BsBookmark } from "react-icons/bs";
import { FiShare2, FiTag, FiTrendingUp } from "react-icons/fi";
import { AiOutlineEye, AiFillStar } from "react-icons/ai";

const NewsCard = ({ news }) => {
  const [expanded, setExpanded] = useState(false);

  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(new Date(news?.author?.published_date));
  }, [news?.author?.published_date]);

  const previewLimit = 220;
  const preview =
    expanded || !news?.details
      ? news?.details
      : news.details.length > previewLimit
      ? news.details.slice(0, previewLimit).trim() + "…"
      : news.details;

  return (
    <article className="card bg-base-100 border border-base-200 shadow-md overflow-hidden">
      {/* Top bar: author + actions */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-primary/20 ring-offset-2">
              <img src={news?.author?.img} alt={news?.author?.name || "Author"} />
            </div>
          </div>
          <div>
            <h3 className="font-semibold">{news?.author?.name}</h3>
            <p className="text-sm opacity-70">{formattedDate}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {news?.others?.is_trending && (
            <div className="badge badge-error gap-1">
              <FiTrendingUp /> {news?.rating?.badge}
            </div>
          )}
          <button className="btn btn-ghost btn-sm">
            <BsBookmark className="h-5 w-5" />
          </button>
          <button className="btn btn-ghost btn-sm">
            <FiShare2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Title */}
      <h2 className="card-title text-2xl px-6">{news?.title}</h2>

      {/* Image */}
      {news?.image_url && (
        <figure className="px-6 pt-4">
          <img
            src={news.image_url}
            alt={news?.title}
            className="rounded-xl w-full object-cover max-h-[380px]"
            loading="lazy"
          />
        </figure>
      )}

      {/* Details */}
      <div className="px-6 pt-4">
        <p className="opacity-80 leading-relaxed">
          {formattedDate} | Tag Cloud:{" "}
          {news.tags?.map((t, i) => (
            <span key={t} className="inline-flex items-center gap-1">
              {i > 0 && ","} <FiTag /> {t}
            </span>
          ))}
          {" – "}
          {preview}
          {news.details?.length > previewLimit && (
            <button
              className="btn btn-link btn-sm align-baseline no-underline"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? "Show less" : "Read More"}
            </button>
          )}
        </p>
      </div>

      <div className="divider my-4" />

      {/* Footer: rating + views */}
      <footer className="px-6 pb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="rating rating-md">
            {Array.from({ length: 5 }).map((_, i) => (
              <input
                key={i}
                type="radio"
                name={`rating-${news?.id}`}
                className="mask mask-star-2 bg-warning"
                checked={Math.round(news?.rating?.number || 0) === i + 1}
                readOnly
              />
            ))}
          </div>
          <span className="text-sm font-medium flex items-center gap-1">
            <AiFillStar className="h-4 w-4" /> {news?.rating?.number?.toFixed(1)}
          </span>
        </div>

        <div className="flex items-center gap-2 opacity-80">
          <AiOutlineEye className="h-5 w-5" />{" "}
          <span>{Number(news?.total_view || 0).toLocaleString()}</span>
        </div>
      </footer>
    </article>
  );
};

export default NewsCard;
