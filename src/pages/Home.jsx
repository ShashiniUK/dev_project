import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";


const Home = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const [searchText, setSearchText] = useState(""); 
  const [searched, setSearched] = useState(false);
  
  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get('http://localhost:8005/pets')
  //     .then((response) => {
  //       setPets(response.data.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false);
  //     });
  // }, []);
  useEffect(() => {
    console.log("Before Axios request");

    axios
      .get("http://localhost:8005/pets")
      .then((response) => {
        console.log("Axios request success");
        setPets(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Axios request error:", error);
        setLoading(false);
      });

    console.log("After Axios request");
  }, []);
  const handleSearch = () => {
    // Filter pets based on the search text
    const filteredPets = pets.filter((pet) => {
      return (
        pet.Name.toLowerCase().includes(searchText.toLowerCase()) ||
        pet._id.toLowerCase().includes(searchText.toLowerCase()) ||
        pet.Category.toLowerCase().includes(searchText.toLowerCase())
      );
    });

    setPets(filteredPets);
    setSearched(true);
  };
  const handleClearSearch = () => {
    setSearchText(""); 
    setSearched(false); 
    
  };
  return (
    <div className="p-4">
      {/* <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div> */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Pets List</h1>
        <Link to="/pets/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by Name, ID, or Category"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-slate-600 px-4 py-2 w-1/2"
        />
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {searched && (
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg"
          onClick={handleClearSearch}
        >
          Clear Search
        </button>
      )}
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>No</th>
              <th className='border border-slate-600 rounded-md'>Name</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>
                Category
              </th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>
                Gender
              </th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>
                birthdate
              </th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>
                Discription
              </th>
              <th className='border border-slate-600 rounded-md'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet, index) => (
              <tr key={pet._id} className="h-8">
                <td className='border border-slate-700 rounded-md text-center'>
                  {index + 1}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {pet.Name}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {pet.Category}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {pet.Gender}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {pet.birthday}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {pet.Discription}
                </td>
                <td className='border border-slate-700 rounded-md text-center '>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/pets/details/${pet._id}`}>
                      <BsInfoCircle className='text-2x1 text-green-800' />
                    </Link>
                    <Link to={`/pets/edit/${pet._id}`}>
                      <AiOutlineEdit className='text-2x1 text-yellow-600'/>
                    </Link>
                    <Link to={`/pets/delete/${pet._id}`}>
                      <MdOutlineDelete className='text-2x1 text-red-600' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
      }
    </div>
  );
};

export default Home;
