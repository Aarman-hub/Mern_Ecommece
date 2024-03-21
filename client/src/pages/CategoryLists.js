import React from 'react';
import Jumbotron from '../components/card/Jumbotron';
import {Link} from 'react-router-dom';
import useCategory from '../hooks/useCategory';



const CategoryLists = () => {

    const {categories} = useCategory();

    return (
    <>
        <Jumbotron title="Categories" subTitle="All Categories" />
        <div className="container overflow-hidden">
            <div className="row gx-5 gy-5 mt-5">
                {categories?.map(c=>(
                    <div className='col-md-6'>
                        <button className='btn bg-warning fw-bold col-12 text-dark p-5'>
                            <Link to={`/category/${c.slug}`}>
                                {c.name}
                            </Link>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}

export default CategoryLists