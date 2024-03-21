import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Jumbotron from '../components/card/Jumbotron';
import ProductCard from '../components/card/ProductCard';

const CategoryView = () => {
  const [products, setProducts] = useState([]); 
  const [category, setCategory]  = useState({});

  const navigate = useNavigate();
  const params = useParams();


  useEffect(() => {
    if(params?.slug) loadProductByCategory();
  }, [params?.slug])

  const loadProductByCategory = async () =>{
    try {
        const {data} = await axios.get(`/product-by-category/${params.slug}`);
        console.log(data)
        setProducts(data.products);
        setCategory(data.category)
    } catch (err) {
        console.log(err);
    }
  }
  

  return ( 
    <>
        <Jumbotron title={category?.name} subTitle="Product sub Category"/>
        <div className='container'>
            <div className='row mt-5'>
              {products?.map(p=>(
                <div className='col-md-4'>
                  <ProductCard p={p} key={p._id} />
                </div>
              ))}
            </div>
        </div>

    </>
  )
}

export default CategoryView