import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useView } from '../../../../hooks/useView';
import { getCategoryThunk } from "../../../../store/viewManager/thunk";
import { getSellerInfoThunk } from "../../../../store/userManagement/thunk";
import { useAppDispatch } from '../../../../store/index';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Select, InputNumber, Input } from 'antd';
import { toast } from "react-toastify";

export const UpdateProduct = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const { category } = useView();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState('');
  const [groups, setGroups] = useState([{ name: '', categories: [''] }]);

  useEffect(() => {
    dispatch(getCategoryThunk());
  }, [dispatch]);

  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 4) {
      toast.warning('Chỉ được phép tải lên tối đa 4 hình ảnh');
      return;
    }

    const newImages = files.slice(0, 4 - images.length); // Giới hạn tối đa 4 hình ảnh
    const imageUrls = newImages.map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...imageUrls]); // Thêm các URL mới vào mảng images
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length + images.length > 4) {
      toast.warning('Chỉ được phép tải lên tối đa 4 hình ảnh');
      return;
    }

    const newImages = files.slice(0, 4 - images.length); // Giới hạn tối đa 4 hình ảnh
    const imageUrls = newImages.map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...imageUrls]); // Thêm các URL mới vào mảng images
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {

    dispatch(
      getSellerInfoThunk({
        sellerTO: {
          RegisteredStudent: {
            Student: {
              studentId: userInfo.username
            }
          }
        }
      })
    )
      .then((action) => {
        const { payload } = action;
        const { data } = payload;
        setUser(data); // Kết hợp userInfo và data thành một đối tượng mới
      })
      .catch((error) => {
        console.error("Error fetching account information:", error);
      });

    if (!userInfo) {
      navigate('/login');
    } else if (userInfo.role !== "Seller") {
      navigate('/authorize');
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    if (user && (user.sellerTO?.active === 2 || user.sellerTO?.active === 0)) {
      navigate('/*');
    }
  }, [user, navigate]);

  const handleAddGroup = () => {
    setGroups([...groups, { name: '', categories: [''] }]);
  };

  const handleGroupNameChange = (index, value) => {
    const newGroups = [...groups];
    newGroups[index].name = value;
    setGroups(newGroups);
  };

  const handleAddCategory = (groupIndex) => {
    const newGroups = [...groups];
    newGroups[groupIndex].categories.push('');
    setGroups(newGroups);
  };

  const handleCategoryChange = (groupIndex, categoryIndex, value) => {
    const newGroups = [...groups];
    newGroups[groupIndex].categories[categoryIndex] = value;
    setGroups(newGroups);
  };

  const handleRemoveGroup = (groupIndex) => {
    const newGroups = [...groups];
    newGroups.splice(groupIndex, 1);
    setGroups(newGroups);
  };

  // Thêm hàm loại bỏ phân loại sản phẩm
  const handleRemoveCategory = (groupIndex, categoryIndex) => {
    const newGroups = [...groups];
    newGroups[groupIndex].categories.splice(categoryIndex, 1);
    setGroups(newGroups);
  };

  return (
    <div>
      <main className='py-10'>
        <div className='pl-14'>
          <div className='font-bold text-4xl'>Chỉnh sửa sản phẩm</div>
          <div className="py-10 pr-6">
            <div className="pb-10 pt-2 border-b-2 border-slate-300">
              <div className="text-2xl font-semibold mb-5">Thông tin cơ bản</div>
              <div className="mb-8">
                <label className='font-semibold'>Tên sản phẩm</label>
                <Input className='border-slate-400 focus:outline-none text-gray-500 focus:text-black border px-4 py-2 h-10 w-full rounded-md mt-2 bg-white' defaultValue='Bút máy trường học chất lượng cao'></Input>
              </div>

              <div className="mt-8">
                <label className='font-semibold'>Miêu tả</label>
                <Input.TextArea className='border-slate-400 text-gray-500 focus:text-black focus:outline-none border px-4 py-2 h-24 w-full rounded-md mt-2 bg-white' defaultValue='Chất liệu sản phẩm: nhựa + mực + iraurita, Kích thước sản phẩm: 13.9cm'></Input.TextArea>
              </div>
            </div>

            <div className="pb-10 pt-6 border-b-2 border-slate-300">
              <div className="text-2xl font-semibold mb-5">Phân loại danh mục</div>
              <div className="mb-8">
                <label className='font-semibold mr-10'>Thể loại sản phẩm</label>
                <Select
                  style={{ width: '100vh' }}
                  defaultValue={4}
                >
                  {category.map(item => (
                    <Option key={item.categoryId} value={item.categoryId}>
                      {item.categoryName}
                    </Option>
                  ))}
                </Select>
              </div>

              <div className="mt-8">
                <div className='font-semibold text-xl mb-2'>Phân loại sản phẩm</div>
                {groups.map((group, groupIndex) => (
                  <div key={groupIndex} className="mb-6 py-4 px-8 bg-gray-200">
                    <div className="mb-10">
                      <label className='font-semibold'>Tên nhóm phân loại sản phẩm</label>
                      <Input
                        type="text"
                        placeholder="Tên nhóm phân loại"
                        value={group.name}
                        onChange={(e) => handleGroupNameChange(groupIndex, e.target.value)}
                        className="border p-2 w-full px-4 py-2 border-slate-400 focus:outline-none rounded-md mt-2"
                      />
                    </div>
                    <div className="mb-5">
                      <label className='font-semibold'>Phân loại sản phẩm</label>
                      <div className="grid grid-cols-3 gap-10 items-center w-full">
                        {group.categories.map((category, categoryIndex) => (
                          <div key={categoryIndex} className="flex items-center">
                            <Input
                              type="text"
                              value={category}
                              onChange={(e) => handleCategoryChange(groupIndex, categoryIndex, e.target.value)}
                              className="border p-2 w-full px-4 py-2 border-slate-400 focus:outline-none rounded-md my-2"
                            />
                          </div>
                        ))}
                        <div className="grid grid-cols-2 items-center">
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded w-[70%]"
                            onClick={() => handleAddCategory(groupIndex)}
                          >
                            Thêm &nbsp;<PlusOutlined />
                          </button>

                          {group.categories.length > 1 && (
                            <button
                              className="bg-red-500 text-white px-4 py-2 rounded w-[70%]"
                              onClick={() => handleRemoveCategory(groupIndex)}
                            >
                              Xóa &nbsp;<MinusOutlined />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    {groups.length > 1 && (
                      <button
                        className="bg-red-500 text-white py-2 px-4 rounded w-full flex justify-center items-center"
                        onClick={() => handleRemoveGroup(groupIndex)}
                      >
                        Xóa nhóm phân loại sản phẩm &nbsp;<MinusOutlined />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded w-full flex justify-center items-center"
                  onClick={handleAddGroup}
                >
                  Thêm nhóm phân loại sản phẩm &nbsp;<PlusOutlined />
                </button>
              </div>
            </div>

            <div className="pb-10 pt-2 border-b-2 border-slate-300">
              <div className="text-2xl font-semibold mb-5">Thông tin cơ bản</div>
              <div className="mb-8">
                <label className='font-semibold'>Đơn giá (VNĐ)</label>
                {/*<input className='border-slate-400 focus:outline-none text-gray-500 focus:text-black border px-4 py-2 h-10 w-full rounded-md mt-2 bg-white' defaultValue='10.000'></input>*/}
                <InputNumber
                  className='border-slate-400 focus:outline-none text-gray-500 focus:text-black border h-10 w-full rounded-md mt-2 bg-white flex items-center'
                  defaultValue={10000}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/đ\s?|(\,*)/g, '')}
                  step={1000}
                />
              </div>

              <div className="mt-8">
                <label className='font-semibold'>Hình ảnh (tối thiểu 1 hình, tối đa 4 hình)</label>
                <div
                  className="border-dashed border-4 border-slate-400 text-black mt-4 px-4 py-8 rounded-md flex items-center justify-center flex-col gap-y-2 text-lg"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <label htmlFor="fileInput" style={{ display: 'block', cursor: 'pointer' }} className="block cursor-pointer px-5 py-2 bg-[#0066b1] rounded-sm text-white">
                    Tải ảnh lên
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      multiple
                      required
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <div className="text-base text-gray-700">Hoặc</div>

                  Kéo và thả ảnh vào đây
                </div>
                <div className="mt-4 flex flex-wrap">
                  {images.map((image, index) => (
                    <img key={index} src={image} alt={`Upload Preview ${index}`} className="w-32 h-32 object-cover mr-2 mb-2 rounded-md" />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default UpdateProduct;
