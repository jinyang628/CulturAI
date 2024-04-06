import React from "react";
import Card from "./Card";

const cardData = [
  {
    id:1,
    title: "San Jose",
    description: "The Capital of Silicon Valley",
    img: "../../San-Jose.jpeg",
  },
  {
    id:2,
    title: "San Francisco",
    description: "The bay city",
    img: "../../San-Francisco.jpeg",
  },
  {
    id:3,
    title: "San Bruno",
    description: "The city with a heart",
    img: "../../San-Bruno.jpeg",
  },
];

export default function HomeScreen() {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="text-3xl font-bold">Let's Explore</div>
      {cardData.map((data) => (
        <Card key={data.id} title={data.title} description={data.description} img={data.img}></Card>
      ))}
    </div>
  );
}
