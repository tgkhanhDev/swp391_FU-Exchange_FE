import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useView } from '../../../../hooks/useView';
import { getCategoryThunk } from "../../../../store/viewManager/thunk";
import { getSellerInfoThunk } from "../../../../store/userManagement/thunk";
import { useAppDispatch } from '../../../../store/index';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Select, InputNumber, Input, Button, Form, FormProps } from 'antd';
import { toast } from "react-toastify";
import { useAccount } from "../../../../hooks/useAccount";
import { Option } from "antd/es/mentions";
import './index.css'
import FirebaseUpload from "../../../../../thirdparty/FirebaseUpload";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imgDB, txtDB } from "../../../../../thirdparty/config";
import { v4 } from "uuid";
import { collection, getDocs } from "firebase/firestore";
import { createProductType } from "../../../../types/product";
import { createProductThunk } from "../../../../store/productManagement/thunk";

interface Category {
  variationDetailName: string;
}

interface Group {
  variationName: string;
  categories: Category[];
}

export const CreateProduct = () => {
  const navigate = useNavigate();
  // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [user, setUser] = useState('');
  const { studentInfo } = useAccount();
  const { category } = useView();
  const dispatch = useAppDispatch();
  const [groups, setGroups] = useState<Group[]>([
    {
      variationName: '',
      categories: [{ variationDetailName: '' }],
    },
  ]);

  //!FB============
  const [txt, setTxt] = useState("");
  const [img, setImg] = useState<string[]>([]);
  const [data, setData] = useState([]);
  const [imgRender, setImgRender] = useState<any>([]);
  //!===============


  useEffect(() => {
    dispatch(getCategoryThunk());
  }, [dispatch]);

  const [images, setImages] = useState<string[]>([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 4) {
      toast.warning('Chỉ được phép tải lên tối đa 4 hình ảnh');
      return;
    }

    console.log("file: ", files);


    const newImages = files.slice(0, 4 - images.length); // Giới hạn tối đa 4 hình ảnh
    const imageUrls = newImages.map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...imageUrls]); // Thêm các URL mới vào mảng images
    
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files: any = Array.from(e.dataTransfer.files);
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
              studentId: studentInfo.username
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

    if (!studentInfo) {
      navigate('/login');
    } else if (studentInfo.role !== "Seller") {
      navigate('/authorize');
    }
  }, [navigate, studentInfo]);

  useEffect(() => {
    if (user && (user.sellerTO?.active === 2 || user.sellerTO?.active === 0)) {
      navigate('/*');
    }
  }, [user, navigate]);

  const handleAddGroup = () => {
    setGroups([...groups, { variationName: '', categories: [''] }]);
  };

  const handleGroupNameChange = (index, value) => {
    const newGroups = [...groups];
    newGroups[index].variationName = value;
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
    newGroups[groupIndex].categories.splice(categoryIndex - 1, 1);
    setGroups(newGroups);

  };

  //!============================Submit
  

  const onFinish: FormProps<createProductType>['onFinish'] = async (values) => {
    values.studentId = studentInfo.username;

    const urls = await handleAddImageToFB();

    values.productImageRequestsList = [];
    urls.map(imgUrl => {
      values.productImageRequestsList.push({imageUrl: imgUrl})
    })

    console.log('Success:', values);
    dispatch(createProductThunk(values));
  };

  const onFinishFailed: FormProps<createProductType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  //!============================

  //!FireBASE
  const handleUpload = async (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    setImgRender(files);
  };

  const handleAddImageToFB = async () => {
    const uploadPromises = imgRender.map((file) => {

      const imageRef = ref(imgDB, `products/${v4()}`);
      return uploadBytes(imageRef, file).then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      });
    });

    const urls = await Promise.all(uploadPromises); // Wait for all uploads to complete
    setImg((prevImg) => [...prevImg, ...urls]);
    return urls;
  };

  //*getData from firebase
  const getData = async () => {
    const valRef = collection(txtDB, "txtData");
    const dataDb = await getDocs(valRef);
    const allData = dataDb.docs.map((val) => ({
      ...val.data(),
      id: val.id,
    }));
    setData(allData);
  };

  useEffect(() => {
    getData();
  }, []);

  //!====================================

  return (
    <Form
      name="basic"
      //labelCol={{ span: 8 }}
      //wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <main className='py-10'>
        <div className='pl-14'>
          <div className='font-bold text-4xl'>Tạo sản phẩm</div>
          <div className="py-10 pr-6">
            <div className="pb-10 pt-2 border-b-2 border-slate-300">
              <div className="text-2xl font-semibold mb-5">Thông tin cơ bản</div>
              <div className="mb-8">
                <label className='font-semibold'>Tên sản phẩm*</label>
                <Form.Item<createProductType>
                  name="productName"
                  className="w-full"
                  rules={[{ required: true, message: 'Vui lòng nhập sản phẩm!' }]}

                >
                  <Input className='border-slate-400 focus:outline-none text-gray-500 focus:text-black border px-4 py-2 h-10 w-full rounded-md mt-2 bg-white' />
                </Form.Item>
              </div>

              <div className="mt-8">
                <label className='font-semibold'>Miêu tả</label>
                <Form.Item<createProductType>
                  name="productDescription"
                  className="!w-full"
                  rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}

                >
                  <Input.TextArea className='border-slate-400 text-gray-500 focus:text-black focus:outline-none border px-4 py-2 h-24 w-full rounded-md mt-2 bg-white' />
                </Form.Item>
              </div>
            </div>

            <div className="pb-10 pt-6 border-b-2 border-slate-300">
              <div className="text-2xl font-semibold mb-5">Phân loại danh mục</div>
              <div className="mb-8">
                <label className='font-semibold mr-10'>Thể loại sản phẩm</label>
                <Form.Item<createProductType>
                  name="categoryId"
                  noStyle
                  rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
                >
                  <Select
                    style={{ width: '100vh' }}
                    placeholder="Chọn danh mục">
                    {category.map(item => (
                      <Option key={item.categoryId + ''} value={item.categoryId + ''}>
                        {item.categoryName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                {/* <Select
                  style={{ width: '100vh' }}
                >
                  {category.map(item => (
                    <Option key={item.categoryId + ''} value={item.categoryId + ''}>
                      {item.categoryName}
                    </Option>
                  ))}
                </Select> */}
              </div>

              <div className="mt-8">
                <div className='font-semibold text-xl mb-2'>Phân loại sản phẩm</div>
                {groups.map((group, groupIndex) => (
                  <div key={groupIndex} className="mb-6 py-4 px-8 bg-gray-200">

                    <div className="mb-10">
                      <label className='font-semibold'>Tên nhóm phân loại sản phẩm {groupIndex + 1}</label>
                      {/* <Form.Item<createProductType>
                        name="productDescription"
                        className="!w-full"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}

                      > */}
                      <Form.Item<createProductType>
                        name={['variationList', groupIndex, 'variationName']}
                        className="!w-full"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                      >
                        <Input
                          type="text"
                          placeholder="Tên nhóm phân loại"
                          value={group.variationName}
                          onChange={(e) => handleGroupNameChange(groupIndex, e.target.value)}
                          className="border p-2 w-full px-4 py-2 border-slate-400 focus:outline-none rounded-md mt-2"
                        />
                      </Form.Item>
                    </div>
                    <div className="mb-5">
                      <label className='font-semibold'>Phân loại sản phẩm</label>
                      <div className="grid grid-cols-3 gap-10 items-center w-full">
                        {group.categories.map((category, categoryIndex) => (
                          <div key={categoryIndex} className="flex items-center">
                            <Form.Item
                              name={['variationList', groupIndex, 'variationDetailRequestList', categoryIndex, 'description']}
                              className="!w-full flex justify-center items-center"
                              rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                            >
                              <Input
                                type="text"
                                placeholder="Chi tiết phân loại"
                                value={category.variationDetailName}
                                onChange={(e) => handleCategoryChange(groupIndex, categoryIndex, e.target.value)}
                                className="border p-2 w-full px-4 py-2 border-slate-400 focus:outline-none rounded-md my-2"
                              />
                            </Form.Item>
                            <div className="grid grid-cols-2">
                              {categoryIndex == group.categories.length - 1 && (
                                <button
                                  className="flex items-center justify-center bg-[var(--color-primary)] text-white px-4 rounded "
                                  onClick={() => handleAddCategory(groupIndex)}
                                >
                                  <span className="flex items-start">Thêm</span> <PlusOutlined />
                                </button>
                              )}

                              {(group.categories.length > 1 && categoryIndex == group.categories.length - 1) && (
                                <button
                                  className="flex bg-white text-[var(--color-primary)] px-4 py-2 rounded "
                                  onClick={() => handleRemoveCategory(groupIndex, categoryIndex)}
                                >
                                  Xóa &nbsp;<DeleteOutlined />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}

                      </div>
                    </div>
                    {groups.length > 1 && (
                      <button
                        className="bg-white text-[var(--color-primary)] py-2 px-4 rounded w-full flex justify-center items-center"
                        onClick={() => handleRemoveGroup(groupIndex)}
                      >
                        Xóa nhóm phân loại sản phẩm &nbsp;<DeleteOutlined />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  className="bg-[var(--color-primary)] text-white py-2 px-4 rounded w-full flex justify-center items-center"
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
                <Form.Item
                  name="price"
                  className="w-1/4"
                  rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                >
                  <InputNumber
                    className='border-slate-400 focus:outline-none text-gray-500 focus:text-black border h-10 w-full rounded-md mt-2 bg-white flex items-center'
                    defaultValue={10000}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    // parser={value => value.replace(/đ\s?|(\,*)/g, '')}
                    step={1000}
                  />
                </Form.Item>
              </div>

              <div className="mt-8">
                {/* <label className='font-semibold'>Hình ảnh (tối thiểu 1 hình, tối đa 4 hình)</label>
                <div
                  className="border-dashed border-4 border-slate-400 text-black mt-4 px-4 py-8 rounded-md flex items-center justify-center flex-col gap-y-2 text-lg"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <label htmlFor="fileInput" style={{ display: 'block', cursor: 'pointer' }} className="block cursor-pointer px-5 py-2 bg-[var(--color-primary)] rounded-sm text-white">
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
                </div> */}
                {/* <FirebaseUpload /> */}
                <br />
                {/* <button onClick={handleClick}>Add</button> */}

                <label className='font-semibold'>Hình ảnh (tối thiểu 1 hình, tối đa 4 hình)</label>
                <div
                  className="border-dashed border-4 border-slate-400 text-black mt-4 px-4 py-8 rounded-md flex items-center justify-center flex-col gap-y-2 text-lg"
                // onDragOver={handleDragOver}
                >
                  <label htmlFor="fileInput" style={{ display: 'block', cursor: 'pointer' }} className="block cursor-pointer px-5 py-2 bg-[var(--color-primary)] rounded-sm text-white">
                    Tải ảnh lên
                    <input id="fileInput" multiple type="file" onChange={(e) => handleUpload(e)} style={{ display: 'none' }} />
                  </label>
                  <div>
                    {imgRender &&
                      imgRender.map(img => {
                        return (
                          <div>{img.name}</div>
                        )
                      })
                    }
                  </div>
                  <div className="text-base text-gray-700">Hoặc</div>
                  Kéo và thả ảnh vào đây
                </div>
                <div className="mt-4 flex flex-wrap">
                  {img.map((image, index) => (
                    <img key={index} src={image} alt={`Upload Preview ${index}`} className="w-32 h-32 object-cover mr-2 mb-2 rounded-md" />
                  ))}
                </div>


              </div>
            </div>

            <div className="flex items-center justify-end mt-5 gap-x-5">
              <Button className="px-5 py-2 flex justify-center items-center text-lg">Hủy</Button>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button htmlType="submit" type="primary" className="px-5 py-2 flex justify-center items-center text-lg">Tạo sản phẩm</Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </main>
    </Form>
  );
};

export default CreateProduct;
