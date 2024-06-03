import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParam = new URLSearchParams(window.location.search);
    urlParam.set('searchTerm', searchTerm);
    const searchQuery = urlParam.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParam = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParam.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center mx-auto max-w-6xl p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Sahand</span>
            <span className='text-slate-700'>Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className='bg-slate-100 p-3 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-700 '>Home</li>
          </Link>
          {currentUser && (
            <Link className=' text-slate-700' to={'/create-listing'}>
              Create Listing
            </Link>
          )}
          <Link to='/about'>
            <li className='hidden sm:inline text-slate-700 '>About</li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img
                src={currentUser.data.avatar}
                className='rounded-full h-7 w-7 object-cover'
                alt='profile'
              />
            ) : (
              <li className=' text-slate-700 hover:underline'> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
