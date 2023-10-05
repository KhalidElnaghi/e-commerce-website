import React from "react";
import { Link } from "react-router-dom";

export default function Product({ product }) {
  return (
    <Link to={"/productdetails/" + product._id} className="col-md-3 my-2  text-decoration-none">
      <div className="product p-4 cursor-pointer overflow-hidden text-black">
        <img className="w-100" src={product.imageCover} alt="" />
        <h6 className="font-sm text-main mt-2">{product.category.name}</h6>
        <h5>{product.title.split(" ").slice(0, 2).join(" ")}</h5>
        <p className="d-flex justify-content-between">
          <span>{product.price} EGP</span>
          <span>
            <i className="fas fa-star rating-color mx-1"></i>
            {product.ratingsAverage}
          </span>
        </p>
        <button className="btn bg-main text-white w-100 mt-3">Add To Cart</button>
      </div>
    </Link>
  );
}
