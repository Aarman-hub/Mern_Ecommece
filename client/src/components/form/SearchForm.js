import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/search';

const SearchForm = () => {
 
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSearch = async (e) =>{
    e.preventDefault();
    try {
        const {data} =await axios.get(`/products/search/${values?.keyword}`); 
        console.log(data);
        setValues({...values, results:data});
        navigate('/search');
    } catch (err) {
        console.log(err)
    }
  } 
  return (
    <form className='d-flex search-form' onSubmit={handleSearch}>
        <input onChange={(e)=>setValues({...values, keyword: e.target.value})} type="text" className="form-control" style={{borderRadius:"0px", border: "1px solid blue", borderRight:"0px"}} placeholder="Search" />
        <button className='btn btn-outline-primary' type='submit'><SearchOutlined style={{borderRadius:"0px !important"}} /></button>
    </form>
  )
}

export default SearchForm