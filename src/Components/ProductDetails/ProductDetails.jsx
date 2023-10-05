import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  let params = useParams();
  let [productDetails, setProductDetails] = useState({});
  let [loading, setLoading] = useState();

  useEffect(() => {
    getProductDetails(params.id);
  }, []);

  const getProductDetails = async (productId) => {
    setLoading(true);
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products/" + productId);
    setLoading(false);
    setProductDetails(data.data);
  };
  return (
    <>
      {loading ? (
        <div className="sk-chase my-5 mx-auto">
          <div className="sk-chase-dot" />
          <div className="sk-chase-dot" />
          <div className="sk-chase-dot" />
          <div className="sk-chase-dot" />
          <div className="sk-chase-dot" />
          <div className="sk-chase-dot" />
        </div>
      ) : (
        <div className="row">
          <div className="col-md-3">
            <img className="w-100" src={productDetails?.imageCover} alt="" />
          </div>
          <div className="col-md-9 p-5">
            <h1>{productDetails?.title}</h1>
            <h2>{productDetails?.categoryname}</h2>
            <p>{productDetails?.description}</p>
            <p>Price : {productDetails?.price}</p>
            <p>
              <i className="fas fa-star text-main"></i>
              {productDetails?.ratingsAverage}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
