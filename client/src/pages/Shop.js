import { Checkbox, Radio } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Jumbotron from '../components/card/Jumbotron'
import ProductCard from '../components/card/ProductCard';
import {prices} from '../prices';


const Shop = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getProducts();
        getTotal();
    }, []);

    useEffect(() => {
        getCategries();
    }, []);

    useEffect(()=>{
       if(checked.length || radio.length)  loadFilteredProduct();
    },[checked, radio])

    useEffect(()=>{
        if(page ===1) return;
        loadMore();
    }, [page])

    const getProducts = async () => {
        try {
        const { data } = await axios.get(`/list-products/${page}`);
        setProducts(data);
        } catch (err) {
        toast.error(err);
        }
    };

    const getCategries = async () => {
        try {
          const { data } = await axios.get("/categories");
          setCategories(data);
        } catch (err) {
          toast.error(err);
        }
    };

    const loadFilteredProduct = async () =>{
        try {
            const {data} = await axios.post("/filtered-products",{
                checked,
                radio,
            });

            setProducts(data)
        } catch (err) {
            console.log(err);
        }
    }

    const getTotal = async () => {
        try {
          const { data } = await axios.get("/products-count");
          setTotal(data);
        } catch (err) {
          toast.error(err);
        }
      };

    const loadMore = async () => {
        try {
          const { data } = await axios.get(`/list-products/${page}`);
          setProducts([...products, ...data]);
          setLoading(false);
        } catch (err) {
          setLoading(false)
        }
      };


    const handleChecked = (value, id) =>{
        let all = [...checked];
        if(value){
            all.push(id);
        }else{
            all = all.filter((c)=> c !== id);        
        }
        setChecked(all);
    };


  return (
    <div>
        <Jumbotron title={"Shop"} subTitle="Products list" />
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-3'>
                    <h4 className='text-center bg-light my-2 p-3'>Categroy Filters</h4>
                    <div className='row p-3'>
                        {categories.map((c)=>(
                            <Checkbox key={c._id} onChange={(e)=>handleChecked(e.target.checked, c._id)}>{c.name}</Checkbox>
                        ))}
                    </div>
                    <h4 className='text-center bg-light my-2 p-3'>Categroy Filters</h4>
                    <div className='row p-3'>
                        <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
                            {prices?.map((p)=>(
                                <div key={p._id} style={{marginLeft:"8px",}}>
                                    <Radio value={p.array}>
                                        {p.name}
                                    </Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className='p-5 pt-0'>
                        <button className='btn btn-outline-danger col-12' onClick={(e)=> window.location.reload()}>Reset</button>
                    </div>
                </div>
                <div className='col-md-9'>
                    <div className='row my-5' style={{height:"100vh"}}>
                        {products?.map((p)=>(
                            <div className='col-md-4' key={p._id}>
                                <ProductCard p={p} />
                            </div>
                        ))}
                    </div>
                    <div className='row text-center p-5'>
                        {products && products.length <total && (
                        <button disabled={loading} onClick={(e)=>{
                            e.preventDefault();
                            console.log(page)
                            setPage(page +1)
                        }} className='btn btn-success'>Load More</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Shop