import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyComponent() {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
      .then(response => {
        setCities(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleCityChange = (event) => {
    const selectedCityId = event.target.value;
    const selectedCity = cities.find(city => city.Id === selectedCityId);

    if (selectedCity) {
      setDistricts(selectedCity.Districts);
      setWards([]);
    }
  };

  const handleDistrictChange = (event) => {
    const selectedDistrictId = event.target.value;
    const selectedDistrict = districts.find(district => district.Id === selectedDistrictId);

    if (selectedDistrict) {
      setWards(selectedDistrict.Wards);
    }
  };

  return (
    <div className='grid grid-cols-3 gap-8'>
      <div>
        <label className='text-xl font-semibold'>Tỉnh thành</label>
        <select className="mt-2 border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md" onChange={handleCityChange}>
          <option defaultValue>Chọn tỉnh thành</option>
          {cities.map(city => (
            <option key={city.Id} value={city.Id}>{city.Name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className='text-xl font-semibold'>Quận huyện</label>
        <select className="mt-2 border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md" onChange={handleDistrictChange}>
          <option defaultValue>Chọn quận huyện</option>
          {districts.map(district => (
            <option key={district.Id} value={district.Id}>{district.Name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className='text-xl font-semibold'>Phường xã</label>
        <select className="mt-2 border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md">
          <option defaultValue>Chọn phường xã</option>
          {wards.map(ward => (
            <option key={ward.Id} value={ward.Id}>{ward.Name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default MyComponent;
