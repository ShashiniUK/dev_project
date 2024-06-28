import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; 
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';

const EditPet = () => {
  const[Name, setName] = useState('');
  const[Gender, setGender] = useState('');
  const[Category, setCategory] = useState('');
  const[birthday, setbirthday] = useState('');
  const[Discription, setDiscription] = useState('');
  const[loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } =useParams();
  const { enqueueSnackbar } = useSnackbar();
  useEffect (() => {
    setLoading(true);
    axios.get(`http://localhost:8005/pets/${id}`)
    .then((response) => {
      setName(response.data.Name);
      setCategory(response.data.Category);
      setGender(response.data.Gender);
      setbirthday(response.data.birthday);
      setDiscription(response.data.Discription);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      alert('An error happened. Please Chack console');
      console.log(error);
    });

  },[]

  )
  const handleEditPet = () => {
    const data ={
      Name,
      Gender,
      Category,
      birthday,
      Discription,
    };
    setLoading(true);
    axios
        .put(`http://localhost:8005/pets/${id}`, data)
        .then(() => {
          setLoading(false);
          enqueueSnackbar('Pet details Edited successfully', { variant: 'success' });
          navigate('/home');
        })
        .coach((error) =>{
          setLoading(false);
          //alert('An error happened.Please check console');
          enqueueSnackbar('Error', { variant: 'error' });
          console.log(error);
       });
  };
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3x1 my-4'>Edit Pet</h1>
      {loading ? <Spinner/> :''}
      <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-x1-mr-4 text-gray-500'>Name</label>
          <input 
            type='text'
            value ={Name}
            onChange={(e) => setName(e.target.value)  }
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
          <label className='text-x1-mr-4 text-gray-500'>Category</label>
          <input 
            type='text'
            value ={Category}
            onChange={(e) => setCategory(e.target.value)  }
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
          <label className='text-x1-mr-4 text-gray-500'>Gender</label>
          <input 
            type='text'
            value ={Gender}
            onChange={(e) => setGender(e.target.value)  }
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
          <label className='text-x1-mr-4 text-gray-500'>birthday</label>
          <input 
            type='text'
            value ={birthday}
            onChange={(e) => setbirthday(e.target.value)  }
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
          <label className='text-x1-mr-4 text-gray-500'>Discription</label>
          <input 
            type='text'
            value ={Discription}
            onChange={(e) => setDiscription(e.target.value)  }
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditPet}>
          Save
        </button>

      </div>
    
    </div>
  )
}

export default EditPet