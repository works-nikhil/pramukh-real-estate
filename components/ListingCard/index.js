import React from "react";

const ListingCard = ({ img, name, description, area, price, onClick }) => {
  return (
    <div
      className="overflow-hidden rounded-lg p-2 laptop:p-4 first:ml-0 link"
      onClick={onClick}
    >
      <div
        className="relative rounded-lg overflow-hidden transition-all ease-out duration-300 h-48 mob:h-auto"
        style={{ height: "600px" }}
      >
        <img
          alt={name}
          className="h-full w-full object-cover hover:scale-110 transition-all ease-out duration-300"
          src={img}
        ></img>
      </div>
      <h1 className="mt-5 text-3xl font-medium">
        {name ? name : "Project Name"}
      </h1>
      <h2 className="text-xl opacity-50">
        {description ? description : "Description"}
      </h2>
      <div className="mt-2 flex flex-col space-y-1">
        <div className="flex items-center text-lg">
          <span className="mr-2">📍</span>
          <span className="font-medium">{area ? area : "Area"}</span>
        </div>
        <div className="flex items-center text-lg">
          <span className="mr-2">💰</span>
          <span className="font-medium text-green-600">{price ? price : "Price"}</span>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;