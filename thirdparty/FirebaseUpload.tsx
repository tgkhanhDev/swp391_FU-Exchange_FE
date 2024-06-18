import React, { useState, useEffect } from "react";
import { imgDB, txtDB } from "./config";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
export const FirebaseUpload = () => {
    const [txt, setTxt] = useState("");
    const [img, setImg] = useState("");
    const [data, setData] = useState([]);
    const [images, setImages] = useState<string[]>([]);

    const handleUpload = (e) => {
        // console.log("targetFileUpload: ",e.target.files[0]);
        const imgs = ref(imgDB, `Imgs/${v4()}`); //ra reference chua bucket, path_

        uploadBytes(imgs, e.target.files[0]).then((data) => {
            console.log(data, "imgs");
            getDownloadURL(data.ref).then((val) => {
                setImg(val);
            });
        });
    };

    const handleClick = async () => {
        const valRef = collection(txtDB, "txtData");
        await addDoc(valRef, { txtVal: txt, imgUrl: img });
        alert("Data added successfully");
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
        console.log("Cai gi day: ", dataDb);
    };

    useEffect(() => {
        getData();
    });
    //   console.log(data, "datadata:");

    //!IMG UPLOAD
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

    return (
        <div>
            <input onChange={(e) => setTxt(e.target.value)} />
            <br />
            {/* <input type="file" onChange={(e) => handleUpload(e)} /> */}
            <br />
            <br />
            <button onClick={handleClick}>Add</button>

            <label className='font-semibold'>Hình ảnh (tối thiểu 1 hình, tối đa 4 hình)</label>
            <div
                className="border-dashed border-4 border-slate-400 text-black mt-4 px-4 py-8 rounded-md flex items-center justify-center flex-col gap-y-2 text-lg"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <label htmlFor="fileInput" style={{ display: 'block', cursor: 'pointer' }} className="block cursor-pointer px-5 py-2 bg-[var(--color-primary)] rounded-sm text-white">
                    Tải ảnh lên
                    {/* <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        multiple
                        required
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    /> */}
                    <input type="file" onChange={(e) => handleUpload(e)} />

                </label>
                <div className="text-base text-gray-700">Hoặc</div>

                Kéo và thả ảnh vào đây
            </div>
            <div className="mt-4 flex flex-wrap">
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Upload Preview ${index}`} className="w-32 h-32 object-cover mr-2 mb-2 rounded-md" />
                ))}
            </div>

            {/* {data.map((value) => (
        <div>
          <h1>{value.txtVal}</h1>
          <img src={value.imgUrl} height="200px" width="200px" />
        </div>
      ))} */}
        </div>
    );
};

export default FirebaseUpload;
