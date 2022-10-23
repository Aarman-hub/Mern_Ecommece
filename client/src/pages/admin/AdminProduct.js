import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import Jumbotron from '../../components/card/Jumbotron';
import AdminNav from '../../components/nav/AdminNav';
import { useAuth } from '../../context/auth';
import {Select} from 'antd';
import moment from 'moment';

const AdminProduct = () => {
    const [products, setProducts] = useState([])
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();

    const {Option} = Select;
  
    useEffect(() => {
      getProducts();
    }, []);

    const getProducts = async () => {
      try {
        const { data } = await axios.get("/products");
        setProducts(data);
      } catch (err) {
        toast.error(err);
      }
    };

  


    return (
      <>
        <Jumbotron title={`Hello ${auth?.user?.name}`} subTitle="Admin Products" />
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-3'>
              <AdminNav />
            </div>

            <div className='col-md-9'>
              <div className='p-2 mb-2 mt-2 h4 bg-light'>Admin Products</div>
              {products.map((p)=>(
                <Link 
                  key={p._id}
                  to={`/dashboard/admin/product/update/${p.slug}`}
                >
                  <div className='card mb-3'>
                    <div className='row g-0'>
                      <div className='col-md-4'>
                        <img
                          src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                          alt={p.name}
                          className="img img-fluid"
                        />
                      </div>
                      <div className='col-md-8'>
                        <div className='card-body'>
                          <h5 className='card-title'>{p.name}</h5>
                          <p className='card-text'>{p.description}</p>
                          <p className='card-text'>
                            <small className='text-muted'>{moment(p.createdAt).format("MMMM Do YYYY,  h:mm:ss a")}</small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </>
    )
}

export default AdminProduct