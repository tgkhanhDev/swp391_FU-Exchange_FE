import React from "react";

export const AdminDashboard = () => {
  return (
    <div>
      <div className="col-span-9 ">
        <div className="w-full mt-[50px] text-lg ml-[25px] flex flex-row gap-x-3  ">
          <div className=" pt-[12px] ">All(56)</div>
          <div className=" pt-[12px] " >dropdown</div>
          <div className="bg-[rgb(253,112,20)] text-white rounded-full pt-[7px]  pb-[7px] pl-[20px] pr-[20px] content-center flex flex-row" >
            <div className="mt-[7px]">ADD NEW </div>
            <div className="ml-[20px] text-4xl">+</div>
          </div>
        </div>
        <div className="col-span-9 grid grid-cols-12 pt-[30px]">
          <div className=" header col-span-12 grid grid-cols-12 gap-4 border-2 border-gray-200  rounded-tr-lg pl-[20px] pt-[10px] ">
            <div className="col-span-1 mr-[5px]">  <input type="checkbox" class="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none" name="option1" value="Option 1"></input></div>
            <div className="col-span-1">Image</div>
            <div className="col-span-3">Title</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2">Title</div>
            <div className="col-span-1">Amount</div>
            <div className="col-span-2">Status</div>
          </div>
          <div className=" body col-span-12 grid grid-cols-12 gap-4   rounded-tr-lg pl-[20px] pt-[10px] ">
            <div className="col-span-1 mr-[5px]">  <input type="checkbox" class="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none" name="option1" value="Option 1"></input></div>
            <div className="col-span-1">Image</div>
            <div className="col-span-3">Khoa</div>
            <div className="col-span-2">15/06/2024</div>
            <div className="col-span-2">3213</div>
            <div className="col-span-1">$21312</div>
            <div className="col-span-2"><span className="text-white bg-[rgb(253,112,20)] pt-[5px] pb-[5px] pl-[7px] pr-[7px] rounded-3xl">On going</span></div>
          </div>
        </div>


      </div>



    </div>
  )
}

export default AdminDashboard;
