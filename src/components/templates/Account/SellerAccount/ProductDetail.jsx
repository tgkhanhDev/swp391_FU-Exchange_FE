import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, useParams } from 'react-router-dom'
import { Button, Card, Row, Col, Typography, Divider, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useAccount } from "../../../../hooks/useAccount";
import { useAppDispatch } from "../../../../store";
import { getProductByIdThunk } from "../../../../store/productManagement/thunk";
import { getSellerInfoThunk } from "../../../../store/userManagement/thunk";
import { useProduct } from "../../../../hooks/useProduct";

const { Title, Text } = Typography;

export const ProductDetailById = () => {
  const navigate = useNavigate();
  const { studentInfo } = useAccount();
  const { productView } = useProduct()
  const dispatch = useAppDispatch();
  const [user, setUser] = useState('');
  const { productId } = useParams();

  const [zoomedImage, setZoomedImage] = useState(null);

  const openZoomModal = (image) => {
    setZoomedImage(image);
  };

  const closeZoomModal = () => {
    setZoomedImage(null);
  };

  useEffect(() => {
    dispatch(getProductByIdThunk(productId));

    dispatch(
      getSellerInfoThunk({
        sellerTO: {
          RegisteredStudent: {
            Student: {
              studentId: studentInfo?.username
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
    }
    else if (studentInfo.role !== "Seller") {
      navigate('/authorize');
    }
  }, [])

  useEffect(() => {
    if (user && (user.sellerTO?.active === 2 || user.sellerTO?.active === 0)) {
      navigate('/*');
    }
  }, [user, navigate]);

  console.log(productView)

  return (
    <div>
      <main className='py-10'>
        <div className='pl-14'>
          <div className='font-bold text-4xl'>Chi tiết sản phẩm</div>
          <div className="flex my-3">
            <Button type="primary" className="flex justify-center items-center py-5 px-8 text-lg mr-5" onClick={() => navigate('/dashboard/product')}>Trở về</Button>
          </div>
          <div className=" pr-6">
            {productView.length > 0 && (productView.map(product =>
              <Card key={product.detail?.productDetailId}>
                <Title level={3}>{product.detail?.productName}</Title>
                <Text>{product.detail?.description}</Text>
                <Divider />
                <Row gutter={16}>
                  {product.image && product.image.length > 0 && (
                    product.image.map((image, index) => (
                      <Col span={6} key={index}>
                        <img src={image.imageUrl} alt={`Product Image ${index + 1}`} className="h-48 w-48 object-cover cursor-pointer" onClick={() => openZoomModal(image)} />
                      </Col>
                    ))
                  )}
                </Row>
                <Divider />
                <Text><strong>Danh mục sản phẩm: </strong>{product.category?.categoryName}</Text>
                <Divider />
                <Text><strong>Giá: </strong>{product.price} VNĐ</Text>
                <Divider />
                {product.variation && product.variation.length > 0 && (
                  product.variation.map((variation, index) => (
                    <div key={index}>
                      <Text><strong>Tên thể loại:</strong> {variation.variationName}</Text>
                      {variation.variationDetail && variation.variationDetail.length > 0 && (
                        variation.variationDetail.map((variationDetail, index1) => (
                          <Text className="block" key={index1}>
                            - {variationDetail.description}
                          </Text>
                        ))
                      )}
                    </div>
                  ))
                )}
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Modal
        visible={!!zoomedImage}
        footer={null}
        onCancel={closeZoomModal}
        width={600}
        centered
      >
        {zoomedImage && (
          <img src={zoomedImage.imageUrl} alt="Zoomed Product Image" style={{ width: '100%', height: '60%', objectFit: 'cover'}} />
        )}
      </Modal>
    </div>
  )
}


export default ProductDetailById