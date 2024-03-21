import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Jumbotron from '../components/card/Jumbotron'
import ProductCard from '../components/card/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([])
  
    useEffect(() => {
      getProducts();
    },[]);

    const getProducts = async () => {
      try {
        const { data } = await axios.get("/products");
        setProducts(data);
      } catch (err) {
        toast.error(err);
      }
    };
    

  const arr = [...products];
  const sortedProduct = arr?.sort((a, b)=> (a.sold < b.sold ? 1 : -1));

  return (
    <>
        <Jumbotron title={"Home"} subTitle="React Ecommerce" />
        <div className='row px-2'>
          <div className='col-md-6'>
            <h4 className='text-center bg-light p-3 mb-3 mt-3'>New Products</h4>
            <div className='row'>
              {products?.map((p)=>(
                <div className='col-md-6' key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          </div>
          <div className='col-md-6'>
            <h4 className='text-center bg-light p-3 mb-3 mt-3'>Best Seller</h4>
            <div className='row'>
              {sortedProduct?.map((p)=>(
                <div className='col-md-6' key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
    </>
  )
}

export default Home