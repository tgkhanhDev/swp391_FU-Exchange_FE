import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import MyComponent from "./MyComponent";
import { Radio } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Test.css";

export const ProfileTemplate = () => {
  const [selectedDate, handleDateChange] = useState(new Date());
  return (
    <div>
      <main className="py-10">
        <div className="pl-14">
          <div className="font-bold text-4xl">Tài khoản của tôi</div>{" "}
          <div className="py-10 pl-10 pr-6">
            {/*Điền tên */}
            <div className="grid grid-cols-2 gap-8 pb-10 border-b-2 border-b-[#d0d0d0]">
              {/*First Name */}
              <div>
                <label className="font-semibold">Họ</label>
                <input
                  type="text"
                  className="border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2"
                ></input>
              </div>
              {/*Last Name*/}
              <div>
                <label className="font-semibold">Tên</label>
                <input
                  className="border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2 bg-white"
                  disabled
                ></input>
              </div>
            </div>

            {/*SĐT + ID num */}
            <div className="grid grid-cols-2 gap-8 pb-10 border-b-2 border-b-[#d0d0d0] mt-10">
              {/*ID Number */}
              <div>
                <label className="font-semibold">Số CCCD/CMND</label>
                <input
                  type="text"
                  className="border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2"
                ></input>
                <input
                  className="border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2 bg-white"
                  disabled
                ></input>
              </div>
              {/*Phone Number*/}
              <div>
                <label className="font-semibold">Số điện thoại</label>
                <input
                  className="border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2 bg-white"
                  disabled
                ></input>
              </div>
            </div>

            {/*Location */}
            <div className="pb-10 border-b-2 border-b-[#d0d0d0] mt-10">
              {/*Địa chỉ chi tiết (Tên đường, số nhà) */}
              <div>
                <label className="font-semibold" htmlFor="name">
                  Địa chỉ cụ thể (Số nhà, tên đường)
                </label>
                <input
                  type="text"
                  id="name"
                  className="border-slate-400 focus:outline-none border px-4 h-10 w-full rounded-md mt-2"
                ></input>
              </div>
              <MyComponent />
            </div>
            <div className="pb-10 border-b-2 border-b-[#d0d0d0] mt-10">
              <div>
                <label className="font-semibold mr-40">Giới tính</label>
                <Radio.Group value={"Nam"}>
                  <Radio value={"Nam"} className="mr-20" disabled>
                    Nam
                  </Radio>
                  <Radio value={"Nữ"} className="mr-20" disabled>
                    Nữ
                  </Radio>
                  <Radio value={"Khác"} className="mr-20" disabled>
                    Khác
                  </Radio>
                </Radio.Group>
              </div>
              <div className="mt-8">
                <label className="font-semibold mr-20">
                  Ngày tháng năm sinh
                </label>
                <input
                  className=" border-slate-400 focus:outline-none border px-4 h-10 rounded-md bg-white"
                  disabled
                ></input>
              </div>
            </div>
            <div className="pb-10 border-b-2 border-b-[#d0d0d0] mt-10">
              <label className="font-semibold mr-20">Mật khẩu</label>
              <input
                className="mt-2 border-slate-400 px-4 border focus:outline-none h-10 rounded-md bg-white"
                type="password"
                value="abcxyz"
                disabled
              ></input>

              {/*Modal Đổi mật khẩu */}
              <Button
                type="primary"
                className="ml-5 w-32 h-9 px-1 py-1 bg-[var(--color-primary)] text-white rounded-md"
                onClick={showModal}
              >
                Thay đổi
              </Button>

              <Modal
                title={<span className="text-2xl">Đổi Mật khẩu</span>}
                className="text-center "
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <Form>
                  <Form.Item label="Nhập mật khẩu hiện tại">
                    <Input.Password className="h-8 rounded-md px-4"></Input.Password>
                  </Form.Item>

                  <Form.Item label="Nhập mật khẩu mới">
                    <Input.Password className="h-8 rounded-md px-4"></Input.Password>
                  </Form.Item>

                  <Form.Item label="Xác nhận mật khẩu mới">
                    <Input.Password className="h-8 rounded-md px-4"></Input.Password>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
            <div className="mt-5 flex justify-end pr-3">
              <Button className="w-24 h-12 px-1 py-1 bg-white text-[var(--color-primary)] rounded-md border border-[var(--color-primary)] text-lg">
                Hủy
              </Button>
              <Button
                type="primary"
                className="ml-5 w-64 h-12 px-1 py-1 bg-[var(--color-primary)] text-white rounded-md text-lg"
              >
                Lưu thay đổi
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileTemplate;
