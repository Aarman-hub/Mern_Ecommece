import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Badge } from "antd";
import ProductCard from "../components/card/ProductCard";
import { toast } from "react-toastify";
import { useCart } from "../context/cart";
import moment from "moment";

const ProductView = () => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [cart, setCart] = useCart();


  const params = useParams();

  useEffect(() => {
    if (params?.slug) loadProduct();
  },[params?.slug]);

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/product/${params.slug}`);
      setProduct(data);
      loadRealtedProduct(data._id, data.category._id);
    } catch (err) {}
  };

  const loadRealtedProduct = async (productId, categoryId) =>{
    try {
        const {data} = await axios.get(`/related-product/${productId}/${categoryId}`)
        setRelated(data);
    } catch (err) {
        
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-3">
            <Badge.Ribbon text={`${product?.sold} sold`} color="red">
              <Badge.Ribbon
                text={`${
                  product?.quantity >= 1
                    ? `${product?.quantity - product?.sold} in stock`
                    : "Out of stock"
                }`}
                placement="start"
                color="green"
              >
                <img
                  className="card-img-top"
                  src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
                  alt={product.name}
                />
              </Badge.Ribbon>
            </Badge.Ribbon>
            <div className="card-body">
                <h1 className="fw-bold">{product.name}</h1>
                <div className="d-flex justify-content-between lead  fw-bold">
                    <div>
                      <p>Price: {" "}
                      {product?.price?.toLocaleString("en-us",{
                        style:"currency",
                        currency:"USD"
                      })}
                      </p>
                      <p>Category: {product?.category?.name}</p>
                      <p>Added: {moment(product?.createdAt).fromNow()}</p>
                    </div>
                </div>

                <p className="card-text">{product.description}</p>
            </div>

            

            <button
              className="btn btn-outline-primary col card-button"
              style={{ borderBottomLeftRadius: "none" }}
              onClick={()=>{
                setCart([...cart, product]);
                localStorage.setItem("cart", JSON.stringify([...cart, product]))
                toast.success("Added to cart")
            }}
            >
              Add To Card
            </button>
          </div>
        </div>
        <div className="col-md-4">
            <h1 className="fw-bold">Related Product</h1>
            <div>
                {related?.length < 1 && "Product Not found"}
                {related?.map(p=> <ProductCard p={p} key={p._id} />) }
            </div>
            
        </div>
      </div>
    </div>
  );
};

export default ProductView;
