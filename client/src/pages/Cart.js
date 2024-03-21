import { DeleteOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import Jumbotron from "../components/card/Jumbotron";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const removeFromCart = (productId) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item.id === productId);
    myCart.splice(index, 1);
    setCart(myCart);

    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  const cartTotal = () => {
    let total = 0;
    cart.map((item) => {
      total += item.price;
    });

    return total;
  };

  return (
    <>
      <Jumbotron
        title={"Cart"}
        subTitle={
          cart?.length > 1
            ? `You have ${cart.length} items in your cart. ${
                auth?.token ? "" : "Please login to chackout"
              }`
            : "Your cart is empty"
        }
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="p-3 mt-2 mb-2 h4 bg-light">
              {cart?.length > 1 ? (
                "My Cart"
              ) : (
                <div className="text-center">
                  <h2>Cart is empty!!</h2>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/")}
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {cart?.length && (
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              {cart?.map((p) => (
                <div
                  key={p._id}
                  className="card mb-5"
                  style={{ maxWidth: 600 }}
                >
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                        alt={p.name}
                        style={{
                          height: "160px",
                          width: "200px",
                          objectFit: "cover",
                          margin: "-12px",
                          borderRopRightRadius: "0px",
                        }}
                      />
                    </div>
                    <div className="col-md-8 d-flex justify-content-end">
                      <div className="card-body">
                        <h5 className="cart-title">{p.name}</h5>
                        <h6 className="card-text">$ {p.price}</h6>
                      </div>
                      <p
                        className="fw-bold p-3"
                        onClick={() => removeFromCart(p._id)}
                        style={{ fontSize: "30px" }}
                      >
                        <DeleteOutlined />
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-3">
              <h5>Chackout</h5>
              <h2>Cart total: $ {cartTotal()}</h2>

              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <hr />
                    <h4>Address</h4>
                    <h5>{auth?.user?.address}</h5>
                  </div>
                  <button className="btn btn-outline-warning">
                    Update Address
                  </button>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Added Delevery address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => navigate("/login",{state:"/cart"})}
                    >
                      Login to Chackout
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
