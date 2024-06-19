import React, { useState, useEffect } from "react";
import { imgDB, txtDB } from "./config";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import useFireBase from "./hooks/useFireBase";

export const FirebaseUpload = () => {

   

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    useEffect(()=> {
        console.log("img ne:::", img);
    },[img])

    return (
        <div>
            {/* <input onChange={(e) => setTxt(e.target.value)} /> */}
            <br />
            <button onClick={handleClick}>Add</button>

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
    );
};

export default FirebaseUpload;
