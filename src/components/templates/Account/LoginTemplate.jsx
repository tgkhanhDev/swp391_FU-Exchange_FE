import { Button, Input } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../../store";
import {
  getLoginThunk,
  isRegisteredThunk,
} from "../../../store/userManagement/thunk";
import { useAccount } from "../../../hooks/useAccount";
import { useNavigate, Navigate } from "react-router-dom";
import { QuestionCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';

export const LoginTemplate = () => {
  const mssvRef = useRef("");
  const pwdRef = useRef("");
  const { isAccountRegistered, isAuthorize } = useAccount();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const checked = (e) => {
    e.preventDefault();
    dispatch(isRegisteredThunk(mssvRef.current));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(
      getLoginThunk({ username: mssvRef.current, password: pwdRef.current })
    );
    if (isAuthorize) window.location.href = "/authorize";
  };

  return (
    <div>
      <header className="bg-[var(--color-bg-hightlight)] text-[#f6f6f6] w-full min-w-[950px] py-3 px-5 flex justify-between items-center">
        <NavLink to={"/"}>
          <div className="hover:opacity-80">
            <div className="text-lg flex justify-center"><ArrowLeftOutlined className="text-xl mr-2" />Trở về</div>
          </div>
        </NavLink>
        <NavLink to={"/register"}>
          <div className="hover:opacity-80">
            <div className="text-lg flex justify-center">
              <QuestionCircleOutlined className="text-xl mr-2" />
              Lần đầu đăng nhập? Ấn vào đây
            </div>
          </div>
        </NavLink>
      </header>
      <main className="flex justify-center items-center h-[92vh]">
        <div className="grid grid-flow-col grid-cols-2 justify-center items-center gap-20 p-16 bg-white w-[80%] rounded-2xl">
          <div>
            <div className="text-center text-3xl mb-6 text-[var(--color-primary)] font-semibold">
              Đăng nhập
            </div>
            <form>
              <div className="mb-6 ">
                <label className="text-[#9f9f9f] mb-2">
                  MSSV (Mã số sinh viên)
                </label>
                <Input
                  className="w-full h-10 rounded-xl text-[#666666] border-slate-400 px-5 focus:outline-none border mt-2"
                  type="text"
                  onChange={(e) => {
                    mssvRef.current = e.target.value;
                  }}
                ></Input>
              </div>
              {!isAccountRegistered && (
                <button
                  className="bg-[var(--color-primary)] text-white w-full py-2 rounded-3xl text-xl duration-200 hover:shadow-[inset_0_0_10px_rgba(255,255,255,0.6)]"
                  onClick={checked}
                >
                  Kiểm tra
                </button>
              )}
            </form>

            {/*Mật khẩu */}
            {isAccountRegistered && (
              <form>
                <div className="mb-6 ">
                  <label className="text-[#9f9f9f] mb-2">Mật khẩu</label>
                  <input
                    className="w-full h-10 rounded-xl text-[#666666] border-slate-400 px-5 focus:outline-none border"
                    type="password"
                    onChange={(e) => (pwdRef.current = e.target.value)}
                  ></input>
                </div>
                <button
                  className="bg-[var(--color-primary)] text-white w-full py-2 rounded-3xl text-xl duration-200 hover:shadow-[inset_0_0_10px_rgba(255,255,255,0.6)]"
                  onClick={handleSignIn}
                >
                  Đăng nhập
                </button>
              </form>
            )}
          </div>
          {/*<div>
            <div className='mb-6 px-24'>
              <div className='text-[#9f9f9f] mb-2'>Mật khẩu</div>
              <input className='w-full h-10 rounded-xl text-[#666666] border-slate-400 px-5 focus:outline-none border'></input>
              <button >Submit</button>
            </div>
  </div>*/}
          <div>
            <NavLink to={"/"}>
              <div className="flex justify-center items-center">
                <img src="/images/logos/fu_Ex_logo.png" className="w-[20vw]" />
              </div>
            </NavLink>
            <div className="mt-10 px-12 text-center text-[#666666]">
              Secure Login with reCAPTCHA subject to Google{" "}
              <u className="text-[var(--color-primary)]">Terms</u> &{" "}
              <u className="text-[var(--color-primary)]">Privacy</u>
            </div>
          </div>
        </div>
      </main>
      <Button
        onClick={() => {
          console.log("Hello");
          dispatch(isRegisteredThunk("DE170001"));
        }}
      >
        aaaaaa
      </Button>
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition: Bounce,
      /> */}
    </div>
  );
};

export default LoginTemplate;
