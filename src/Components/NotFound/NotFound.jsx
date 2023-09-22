import React from "react";
import notFoundImage from "../../assets/error.svg";

export default function NotFound() {
  return (
    <div className="text-center">
      <img src={notFoundImage} alt="not-found" className="w-50 my-3" />
    </div>
  );
}
