import React from 'react'
import Jumbotron from '../components/card/Jumbotron'
import { useAuth } from '../context/auth'

const Home = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
        <Jumbotron title={"Home"} subTitle="React Ecommerce" />
        <pre>{JSON.stringify(auth, null, 4)}</pre>
    </>
  )
}

export default Home