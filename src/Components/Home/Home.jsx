import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../Product/Product";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    gatAllProducts();
  }, []);

  const gatAllProducts = async () => {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    setProducts(data.data);
  };
  return (
    <>
      <div className="row">
  
        {products.map((product) => {
          return <Product key={product._id} product={product} />;
        })}
      </div>
    </>
  );
}
