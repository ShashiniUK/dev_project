import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import CreatePets from './pages/CreatePets';
import ShowPet from './pages/ShowPet';
import EditPet from './pages/EditPet';
import DeletePet from './pages/DeletePet';
import LoginDesign from './pages/LoginDesign';
import SignUpPage from './pages/SignUpPage';



const App = () => {
 return (
    <Routes>
      <Route path='/Login' element= {<LoginDesign/>}/>
      <Route path='/SignUp' element= {<SignUpPage/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/pets/create' element={<CreatePets/>}/>
      <Route path='/pets/details/:id' element={<ShowPet/>}/>
      <Route path='/pets/edit/:id' element={<EditPet/>}/>
      <Route path='/pets/delete/:id' element={<DeletePet/>}/>

    </Routes>
    
   
  );
  
};

export default App;
/* <Route path="/" element={<Login/>}/>
       <Route path="/employee/signup" element={<Signup/>}/>*/ 