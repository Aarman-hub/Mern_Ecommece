import axios from 'axios';
import { useEffect, useState } from 'react';
import Jumbotron from '../../components/card/Jumbotron'
import UserNav from '../../components/nav/UserNav';
import { useAuth } from '../../context/auth'

const Profile = () => {
  const [auth, setAuth] = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");


  useEffect(() => {
     const {name, email, address} = auth.user;
     setName(name);
     setEmail(email);
     setAddress(address);
  }, [auth?.user])
  

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const {data} = await axios.put("/user/profile",{
        name,
        email,
        address,
      });
      console.log(data);

    } catch (err) {
      
    }
  }


  return (
    <>
      <Jumbotron title={`Hello ${auth?.user?.name}`} subTitle="User Dashboard" />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-3'>
            <UserNav />
          </div>
          <div className='col-md-9'>
            <h4 className='p-3 mt-2 mb-2 h4 bg-light'>Profile</h4>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter your name"
                value={name}
                onChange={e=>setName(e.target.value)}
                autoFocus={true}
              />
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Enter your name"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                autoFocus={true}
                disabled={true}
              />
              <textarea
                type="text"
                className="form-control mb-2"
                placeholder="Enter your address"
                value={address}
                onChange={e=>setAddress(e.target.value)}
                autoFocus={true}
              />
              <button className='btn btn-primary m-2 p-2'>Update</button>
            </form>


          </div>
        </div>
      </div>
    </>
  );
}

export default Profile