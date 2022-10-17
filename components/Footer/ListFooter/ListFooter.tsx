import React from "react";

type ListFooterType = {
  items: string[];
  mt: boolean;
};

const ListFooter = ({ items, mt }: ListFooterType) => {
  return (
    <div className={`flex flex-wrap gap-2 ${mt && "mt-5"}`}>
      {items.map((item) => (
        <p
          key={item}
          className="text-gray-400 text-sm hover:underline cursor-pointer"
        >
          {item}
        </p>
      ))}
    </div>
  );
};

export default ListFooter;
