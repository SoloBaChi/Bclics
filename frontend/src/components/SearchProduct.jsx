import React from "react";
import Post from "./Post";
import AdsPost from "./AdsPost";

const SearchProduct = () => {
  return (
    <div>
      {[...Array(7)].map((_, index) => (
        <Post key={index} />
      ))}
    </div>
  );
};

export default SearchProduct;
