import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Contact(listing) {
  const listingData = listing.listing;
  const userRef = listingData.userRef;
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState();

  const handleChange = (e) => {
    setMessage(e.target.value);
  }; // handle change

  useEffect(() => {
    const fetchLandlord = async () => {
      const res = await fetch(`/api/user/${userRef}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      }
      setLandlord(data);
    };
    fetchLandlord();
  }, [userRef]);
  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{landlord.username}</span>{' '}
            for{' '}
            <span className='font-semibold'>
              {listingData.name.toLowerCase()}
            </span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={handleChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listingData.name}&body=${message}`}
            className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}

export default Contact;
