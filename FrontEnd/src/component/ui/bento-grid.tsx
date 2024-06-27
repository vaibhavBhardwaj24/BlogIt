import React from "react";
import { cn } from "../../utils/cn.ts";
import { Link } from "react-router-dom";
export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  _id,
  creator,
  creatorName,
  likes,
  comments,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  _id?: string;
  creator: string;
  creatorName: string;
  likes?: number;
  comments?: number;
}) => {
  return (
    <Link
      to={`/b/getById/${_id}`}
      className={cn(
        "row-span-1 h-auto rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      {" "}
      <div className="overflow-hidden object-cover rounded-xl object-top">
        {header}
      </div>
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
        <div className="w-full flex justify-between">
          <Link
            to={`/u/otherUser/${creator}`}
            className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300 hover:underline "
          >
            {" "}
            By-{creatorName}{" "}
          </Link>
          <div className="text-sm">
            <i className="fa-regular fa-heart p-2 ">
              <p className="px-1">{likes}</p>
            </i>
            <i className="fa-regular fa-comment p-2">
              <p className="px-1">{comments}</p>
            </i>
          </div>
        </div>
      </div>
    </Link>
  );
};
