import Jumbotron from '../../components/card/Jumbotron'
import UserNav from '../../components/nav/UserNav';
import { useAuth } from '../../context/auth'

const Orders = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <Jumbotron title={`Hello ${auth?.user?.name}`} subTitle="User Dashboard" />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-3'>
            <UserNav />
          </div>
          <div className='col-md-9'>
            <h4>Orders</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders