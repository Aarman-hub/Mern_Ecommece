import React from "react";
import { Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import { toast } from "react-toastify";

const ProductCard = ({ p }) => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  return (
    <div className="card mb-3 hoverable">
      <Badge.Ribbon text={`${p?.sold} Sold`} color="red">
        <Badge.Ribbon
          text={`${
            p?.quantity >= 1
              ? `${p?.quantity - p?.sold} In Stock`
              : "Out of stack"
          }`}
          placement="start"
          color="pink"
        >
          <img
            className="card-img-top"
            src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
            alt={p.name}
            height="250px"
          />
        </Badge.Ribbon>
      </Badge.Ribbon>

      <div className="card-body">
        <h5>{p?.name}</h5>
        <h4>
          {p?.price?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </h4>
        <p className="card-text">{p?.description?.substring(0, 100)}...</p>
      </div>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary col card-button"
          style={{ borderBottomLeftRadius: "none" }}
          onClick={() => navigate(`/product/${p.slug}`)}
        >
          View Product
        </button>
        <button
          className="btn btn-outline-primary col card-button"
          style={{ borderBottomLeftRadius: "none" }}
          onClick={()=>{
            setCart([...cart, p]);
            localStorage.setItem("cart", JSON.stringify([...cart, p]))
            toast.success("Added to cart")
        }}
        >
          Add To Card
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
