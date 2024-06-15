// import React, { useState, useEffect } from "react";
// import { imgDB, txtDB } from "./config";
// import { v4 } from "uuid";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { addDoc, collection, getDocs } from "firebase/firestore";
// export const FirebaseUpload = () => {
//   const [txt, setTxt] = useState("");
//   const [img, setImg] = useState("");
//   const [data, setData] = useState([]);

//   const handleUpload = (e) => {
//     // console.log("targetFileUpload: ",e.target.files[0]);
//     const imgs = ref(imgDB, `Imgs/${v4()}`); //ra reference chua bucket, path_
    
//     uploadBytes(imgs, e.target.files[0]).then((data) => {
//       console.log(data, "imgs");
//       getDownloadURL(data.ref).then((val) => {
//         setImg(val);
//       });
//     });
//   };

//   const handleClick = async () => {
//     const valRef = collection(txtDB, "txtData");
//     await addDoc(valRef, { txtVal: txt, imgUrl: img });
//     alert("Data added successfully");
//   };

//   //*getData from firebase
//   const getData = async () => {
//     const valRef = collection(txtDB, "txtData");
//     const dataDb = await getDocs(valRef);
//     const allData = dataDb.docs.map((val) => ({
//       ...val.data(),
//       id: val.id,
//     }));
//     setData(allData);
//     console.log("Cai gi day: ", dataDb);
//   };

//   useEffect(() => {
//     getData();
//   });
// //   console.log(data, "datadata:");

//   return (
//     <div>
//       <input onChange={(e) => setTxt(e.target.value)} />
//       <br />
//       <input type="file" onChange={(e) => handleUpload(e)} />
//       <br />
//       <br />
//       <button onClick={handleClick}>Add</button>

//       {data.map((value) => (
//         <div>
//           <h1>{value.txtVal}</h1>
//           <img src={value.imgUrl} height="200px" width="200px" />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FirebaseUpload;
