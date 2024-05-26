import { Button, Checkbox, Dropdown, Input, MenuProps } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../store";
import { getPostThunk } from "../../../store/postManagement/thunk";
import { usePost } from "../../../hooks/usePost";
import { useView } from "../../../hooks/useView";
import { getCampusThunk } from "../../../store/viewManager/thunk";
import { useLocation } from "react-router-dom";
import { Campus, PostFilter_API } from "../../../types/post";

export const PostList = () => {
  const dispatch = useAppDispatch();

  //ref
  const [filterCampus, setFilterCampus] = useState<Campus>();
  const filterPostRef = useRef<number | "">("");
  const filterNameRef = useRef<String>("");

  const { posts } = usePost();
  const { campus } = useView();
  const location = useLocation();

  //Get all Campus list
  const menuItem: MenuProps["items"] = [
    {
      key: 0,
      label: (
        <button
          onClick={() => setFilterCampus({ campusId: 0, campusName: "All" })}
        >
          All Campus
        </button>
      ),
    },
  ].concat(
    campus?.map((item) => {
      return {
        key: item.campusId,
        label: (
          <button
            onClick={() => {
              setFilterCampus(item);
            }}
          >
            {item.campusName}
          </button>
        ),
      };
    })
  );

  const [itemQuantity, setItemQuantity] = useState(6);

  useEffect(() => {
    const getPostPayload: PostFilter_API = {
      current: itemQuantity,
      campusId: ( filterCampus?.campusId == 0 )? "" : filterCampus?.campusId ,
      postTypeId: "",
      name: "",
    };
    dispatch(getPostThunk(getPostPayload));
    dispatch(getCampusThunk());
  }, [itemQuantity, filterCampus]);

  const loadMorePost = () => {
    let newItemQuantity: number;
    if (posts?.meta.total && itemQuantity + 6 > posts.meta.total) {
      newItemQuantity = posts?.meta?.total;
    } else {
      newItemQuantity = itemQuantity + 6;
    }
    setItemQuantity(newItemQuantity);
  };

  return (
    <div className="container">
      {/* Title  */}
      <div style={{ width: "470px" }}>
        <div className="font-bold text-3xl">Shop</div>
        <div className="mt-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </div>
      {/* End Title  */}
      <div className="flex gap-14 mt-14">
        {/* Filter Col  */}
        <div className="flex flex-col" style={{ width: "200px" }}>
          <div className="flex items-end gap-3">
            <div className="font-bold text-xl">Filters</div>
            <div className="underline text-gray-400">Clear Filter</div>
          </div>
          <div className="flex flex-col">
            <div className="font-bold mt-5">Categories</div>
            <div className="flex flex-col gap-3 mt-3">
              <Input placeholder="Search Products..." />
              <Checkbox onChange={() => console.log("Hello")}>
                Checkbox1
              </Checkbox>
              <Checkbox onChange={() => console.log("Hello")}>
                Checkbox2
              </Checkbox>
              <Checkbox onChange={() => console.log("Hello")}>
                Checkbox3
              </Checkbox>
            </div>
          </div>
        </div>
        {/* End Filter  */}

        <div className="w-full">
          {/* Sort  */}
          <div className="flex justify-end mr-10">
            <Dropdown menu={{ items: menuItem }} placement="bottom" arrow>
              <Button>{filterCampus?.campusName}aaaaaaaa</Button>
            </Dropdown>
          </div>
          {/* End Sort  */}
          <div className="grid grid-cols-3 gap-10 mt-10">
            {posts?.data?.map((item) => {
              return (
                <div
                  key={item.postProductId}
                  className="flex flex-col m-auto w-[200px] hover:cursor-pointer"
                  style={{
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  }}
                  onClick={() => {
                    console.log("LOC::: ", location);
                  }}
                >
                  <img
                    src={item.product.image[0].imageUrl}
                    alt=""
                    style={{
                      width: "100%",
                      height: "250px",
                      borderRadius: "15px 15px 0 0",
                    }}
                  />
                  <div className="flex flex-col px-2">
                    <div className="text-2xl font-semibold h-[50px] flex items-center">
                      Title
                    </div>
                    <div className="flex justify-between">
                      <div className="italic">Còn lại: {item.quantity}</div>
                      <div className="font-bold text-xl">
                        {item.product.price}VND
                      </div>
                    </div>
                    <div>{item.campus.campusName}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <Button
            onClick={loadMorePost}
            className="flex items-center justify-center m-auto text-[18px] mt-10"
            style={{ width: "300px", height: "50px" }}
          >
            Load more products -{" "}
            <span className="italic text-xs">
              {" "}
              {posts?.meta.current}/{posts?.meta.total}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostList;
