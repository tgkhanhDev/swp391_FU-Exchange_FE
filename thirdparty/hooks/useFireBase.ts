import { useState, useEffect } from "react";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore";
import { imgDB, txtDB } from "../config";

const useFireBase = () => {
  const [txt, setTxt] = useState("");
  const [img, setImg] = useState<string[]>([]);
  const [data, setData] = useState([]);
  const [imgRender, setImgRender] = useState<any>([]);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    // console.log("targetFileUpload: ", files);
    setImgRender(files);
  };

  const handleClick = async () => {
    const uploadPromises = imgRender.map((file) => {
      const imageRef = ref(imgDB, `products/${v4()}`);
      return uploadBytes(imageRef, file).then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      });
    });

    const urls = await Promise.all(uploadPromises); // Wait for all uploads to complete
    setImg((prevImg) => [...prevImg, ...urls]);
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

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  return {
    img,
    imgRender,
    handleClick,
    handleUpload,
  };
};

export default useFireBase;
