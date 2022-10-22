import React from 'react'

const CategoryForm = ({value, setValue, text, handleSubmit, handleDelete}) => {
  return (
    <>
        <form onSubmit={handleSubmit}>
            <input
            className='form-control p-2'
            type="text"
            value={value}
            placeholder="Category Name"
            onChange={(e)=>setValue(e.target.value)}
            />
            <div className='d-flex justify-content-between'>
                <button className='btn btn-primary mt-2'>{text}</button>
               {handleDelete && (<button onClick={handleDelete} className='btn btn-danger mt-2'>Delete</button>)}  
            </div>
        </form>
    </>
  )
}

export default CategoryForm