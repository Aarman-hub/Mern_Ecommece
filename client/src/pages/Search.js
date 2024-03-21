import React from 'react'
import Jumbotron from '../components/card/Jumbotron'
import ProductCard from '../components/card/ProductCard';
import { useSearch } from '../context/search'

const Search = () => {

  const [values, setValues] = useSearch();

  return (
    <>
        <Jumbotron title={values?.results?.length < 1 ? "Product not found":`Found ${values?.results?.length} Products`} />
        <div className='container mt-3'>
            <div className='row'>
                {values?.results?.map((p)=>(
                <div className='col-md-4' key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
        </div>
    </>
  )
}

export default Search