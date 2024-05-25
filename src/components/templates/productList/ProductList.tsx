import { Button, Checkbox, Dropdown, MenuProps } from "antd";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../../store";
import { getPostThunk } from "../../../store/postManagement/thunk";

export const ProductList = () => {
  const dispatch = useAppDispatch();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Mặc định
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Cao nhất
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Thấp nhất
        </a>
      ),
    },
  ];
  useEffect(() => {
    dispatch(getPostThunk("6"));
  }, []);

  return (
    <div className="container">
      {/* Title  */}
      <div style={{ width: "470px" }}>
        <div className="font-bold text-2xl">Shop</div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </div>
      {/* End Title  */}
      <div>
        {/* Filter Col  */}
        <div className="flex flex-col" style={{ width: "200px" }}>
          <div className="flex items-end gap-3">
            <div className="font-bold text-xl">Filters</div>
            <div className="underline text-gray-400">Clear Filter</div>
          </div>
          <div className="flex flex-col">
            <div className="font-bold">Categories</div>
            <div className="flex flex-col gap-1 mt-3">
              <input placeholder="Search Products..." />
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

        <div>
          {/* Sort  */}
          <div>
            <Dropdown menu={{ items }} placement="bottom" arrow>
              <Button>Sort By: ...</Button>
            </Dropdown>
          </div>
          {/* End Sort  */}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
