import React from "react";

type CardProps = {
  title: string;
  description: string;
  img: string
};
export default function Card({
    title,
    description,
    img
}: CardProps) {
  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl">
      <figure>
        <img
        width="100%"
          src={img}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Read More</button>
        </div>
      </div>
    </div>
  );
}
