import { Button, InputNumber, InputNumberProps, Modal, Radio, RadioChangeEvent, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch } from '../../../../../store';
import { getCampusThunk, getPostTypeThunk } from '../../../../../store/viewManager/thunk';
import { useView } from '../../../../../hooks/useView';
import TextArea from 'antd/es/input/TextArea';
import { createPostThunk } from '../../../../../store/postManagement/thunk';

type postProps = {
    productId: number,
}

export const CreatePostModal: React.FC<postProps> = ({ productId }) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [postTypeChoice, setPostTypeChoice] = useState<number>(1);
    const [campusChoice, setCampusChoice] = useState<number>(1);
    const dispatch = useAppDispatch()

    // Ref 
    const quantityRef = useRef<number>(1)
    const descRef = useRef<string>("")

    const { postType, campus } = useView()
    useEffect(() => {
        dispatch(getPostTypeThunk())
        dispatch(getCampusThunk())
    }, [])

    const showLoading = () => {
        setOpen(true);
        setLoading(true);

        // Simple loading mock. You should add cleanup logic in real world.
        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    useEffect(() => {
        console.log("postTypeChoice:::", postTypeChoice);
    }, [postTypeChoice])

    const onChangeQuantity: InputNumberProps['onChange'] = (value: any) => {
        quantityRef.current = value
    };

    const handleTextArea = (e) => {
        descRef.current = e.target.value
    }

    const handleUploadPost = () => {
        setOpen(false)
        let postUpload = {
            productId: productId,
            postTypeId: postTypeChoice,
            campusId: campusChoice,
            quantity: quantityRef.current,
            content: descRef.current,
        }
        dispatch(createPostThunk(postUpload))
    }

    return (
        <>
            <Button className='rounded' type="primary" onClick={showLoading}>
                Đăng bài
            </Button>
            <Modal
                title={<p>Tạo bài viết</p>}
                footer={
                    <Button className='my-3' type="primary" onClick={handleUploadPost}>
                        Post
                    </Button>
                }
                loading={loading}
                open={open}
                onCancel={() => setOpen(false)}
            >
                <div className="flex flex-col gap-3 mt-3">
                    <div className="font-bold mt-2">Chọn loại bài đăng</div>
                    <Radio.Group
                        onChange={(e: RadioChangeEvent) => {
                            setPostTypeChoice(e.target.value);
                        }}
                        value={postTypeChoice}
                    >
                        <Space direction="vertical">
                            {postType?.map((item) => (
                                <Radio value={item.postTypeId}>{item.postTypeName}</Radio>
                            ))}
                        </Space>
                    </Radio.Group>
                </div>
                <div className="flex flex-col gap-3 mt-3">
                    <div className="font-bold mt-2">Chọn campus</div>
                    <Radio.Group
                        onChange={(e: RadioChangeEvent) => {
                            setCampusChoice(e.target.value);
                        }}
                        value={campusChoice}
                    >
                        <Space direction="vertical">
                            {campus?.map((item) => (
                                <Radio value={item.campusId}>{item.campusName}</Radio>
                            ))}
                        </Space>
                    </Radio.Group>
                </div>

                <div className="flex gap-3 mt-3 items-center">
                    <div className="font-bold flex items-center justify-center">Nhập số lượng: </div>
                    <InputNumber className='flex items-center justify-center' min={1} defaultValue={quantityRef.current} onChange={onChangeQuantity} changeOnWheel />
                </div>

                <div className="flex flex-col gap-3 mt-3 w-full">
                    <div className="font-bold flex items-center">Nhập mô tả</div>
                    <TextArea onChange={handleTextArea} className='w-full border-black' rows={4} placeholder="Mô tả..." maxLength={255} showCount />
                </div>

            </Modal>
        </>
    );
}

export default CreatePostModal