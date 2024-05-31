import {
  Button,
  Checkbox,
  Dropdown,
  Input,
  MenuProps,
  Radio,
  RadioChangeEvent,
  Space,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../store";
import { getPostThunk } from "../../../store/postManagement/thunk";
import { usePost } from "../../../hooks/usePost";
import { useView } from "../../../hooks/useView";
import {
  getCampusThunk,
  getPostTypeThunk,
} from "../../../store/viewManager/thunk";
import { useLocation } from "react-router-dom";
import { Campus, PostFilter_API } from "../../../types/post";
import { useNavigate } from "react-router-dom";

export const PostList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [filterCampus, setFilterCampus] = useState<Campus>({
    campusId: 0,
    campusName: "Tất cả Campus",
  });
  const [filterName, setFilterName] = useState<string>("");
  const [postTypeFilter, setPostTypeFilter] = useState<number | "">("");
  const { posts } = usePost();
  const { campus, postType } = useView();

  //Get all Campus list
  const campusItem: MenuProps["items"] = [
    {
      key: 0,
      label: (
        <button
          onClick={() =>
            setFilterCampus({
              campusId: 0,
              campusName: "Tất cả Campus",
            })
          }
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
      campusId: filterCampus.campusId == 0 ? "" : filterCampus?.campusId,
      postTypeId: postTypeFilter,
      name: filterName,
    };
    dispatch(getPostThunk(getPostPayload));
    dispatch(getPostTypeThunk());
    dispatch(getCampusThunk());
  }, [itemQuantity, filterCampus, filterName, postTypeFilter]);

  const loadMorePost = () => {
    let newItemQuantity: number;
    if (posts?.meta.total && itemQuantity + 6 > posts.meta.total) {
      newItemQuantity = posts?.meta?.total;
    } else {
      newItemQuantity = itemQuantity + 6;
    }
    setItemQuantity(newItemQuantity);
  };

  const handleSearch = (e) => {
    setFilterName(e.target.value);
  };
  const clearFilter = () => {
    setFilterCampus({
      campusId: 0,
      campusName: "Tất cả Campus",
    });
    setFilterName("");
    setPostTypeFilter("");
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
            <button onClick={clearFilter} className="underline text-gray-400">
              Clear Filter
            </button>
          </div>
          <div className="flex flex-col">
            <div className="font-bold mt-5">Categories</div>
            <div className="flex flex-col gap-3 mt-3">
              <Input onChange={handleSearch} placeholder="Search Products..." />
              <Radio.Group
                onChange={(e: RadioChangeEvent) => {
                  setPostTypeFilter(e.target.value);
                }}
              >
                <Space direction="vertical">
                  <Radio checked value="">
                    Tất cả
                  </Radio>
                  {postType.map((item) => (
                    <Radio value={item.postTypeId}>{item.postTypeName}</Radio>
                  ))}
                </Space>
              </Radio.Group>
            </div>
          </div>
        </div>
        {/* End Filter  */}

        <div className="w-full">
          {/* Sort  */}
          <div className="flex justify-end mr-10">
            <Dropdown menu={{ items: campusItem }} placement="bottom" arrow>
              <Button>Lọc theo: {filterCampus?.campusName}</Button>
            </Dropdown>
          </div>
          {/* End Sort  */}
          <div className="grid grid-cols-3 gap-10 mt-10">
            {posts?.data?.map((item) => {
              return (
                <button
                  key={item.postProductId}
                  className="flex flex-col m-auto w-[250px] hover:cursor-pointer border border-[var(--color-primary)] hover:-translate-y-5 transition-all ease-in-out"
                  style={{
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    borderRadius: "15px"
                  }}
                  onClick={() => {
                    navigate(`/detail/${item.postProductId}`);
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
                  <div className="flex flex-col items-start px-2 w-full">
                    <div className="text-xl font-semibold flex items-center h-[100px]">
                      {item.product.detail.productName.length > 60
                        ? item.product.detail.productName.substring(0, 60) +
                          "..."
                        : item.product.detail.productName}
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="italic">Còn lại: {item.quantity}</div>
                      <div className="font-bold text-xl">
                        {item.product.price}VNĐ
                      </div>
                    </div>
                    <div>{item.campus.campusName}</div>
                  </div>
                </button>
              );
            })}
          </div>
          <Button
            onClick={loadMorePost}
            className="flex items-center justify-center m-auto text-[18px] my-10"
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
