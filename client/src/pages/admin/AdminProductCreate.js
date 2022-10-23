import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import Jumbotron from '../../components/card/Jumbotron';
import AdminNav from '../../components/nav/AdminNav';
import { useAuth } from '../../context/auth';
import {Select} from 'antd';

const AdminProductCreate = () => {
    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [category, setCategory] = useState('')
    const [photo, setPhoto] = useState('')
    const [shipping, setShipping] = useState(false)
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();

    const {Option} = Select;
  
    useEffect(() => {
      getCategries();
    }, []);

    const getCategries = async () => {
      try {
        const { data } = await axios.get("/categories");
        setCategories(data);
      } catch (err) {
        toast.error(err);
      }
    };

    const handleSubmit = async (e) =>{
      e.preventDefault();
      try {
        // console.log({name, price, category, description, quantity, shipping, photo});

        const productData = new FormData();
        productData.append("photo", photo);
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("category", category);
        productData.append("shipping", shipping);
        productData.append("quantity", quantity);


        const {data} = await axios.post('/products', productData);

        if(data?.error){
          toast.error(data.error);
        }else{
          toast.success(`${data.name} is created!`);
          navigate("/dashboard/admin/products")
        }

      } catch (err) {
        toast.error("Product created Failed!")
      }
    }


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
              <div>
                {photo &&  <div className='text-center'><img src={URL.createObjectURL(photo)} alt={"ProductPic"} height="200px" /></div>}
              </div>
              <div className='pt-2'>
                <label className='btn btn-secondary col-12 mb-3'>
                  {photo ? photo.name :"Upload Photo"}
                  <input type="file" accept="image/*" name="photo" hidden onChange={(e)=>setPhoto(e.target.files[0])} />
                </label>
              </div>
              <input 
                type="text" 
                className='form-control p-2 mb-3' 
                placeholder='Product Name'
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
              <Select
              // showSearch
                bordered={false}
                size="large"
                className="form-select mb-3"
                placeholder="Choose category"
                onChange={(value) => setCategory(value)}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <textarea 
                type="text" 
                className='form-control p-2 mb-3' 
                placeholder='Product Description'
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
              />
              <input 
                type="Number" 
                className='form-control p-2 mb-3' 
                placeholder='Product Price'
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
              />
              <input 
                type="Number"
                min="1" 
                className='form-control p-2 mb-3' 
                placeholder='Product Quantity'
                value={quantity}
                onChange={(e)=>setQuantity(e.target.value)}
              />
              <Select
                bordered={false}
                size="large"
                className="form-select mb-3"
                placeholder="Choose shipping"
                onChange={(value) => setShipping(value)}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>

              <button onClick={handleSubmit} className='btn btn-primary w-100 mb-5'>Submit</button>
            </div>
          </div>
        </div>
      </>
    )
}

export default AdminProductCreate