
import NotFound from "../page/NotFound"
import { PATH } from "../constants/config";
import ProductPage from "../page/ProductPage";
import PostDetail from "../components/templates/productDetail/PostDetail";
import PostList from "../components/templates/productList/PostList";

export const router = [
  {
    element: <ProductPage />,
    path: "/detail",
    children: [
      {
        element: <PostList />,
        index: true,
      },
      {
        element: <PostDetail />,
        path: PATH.productDetail,
      },
    ],
  },
  {
    element: <PostList />, //Login
    path: PATH.login,
  },
  {
    element: <PostList />, //Register
    path: PATH.register,
  },
  {
    element: <PostList />, //AccountInfo
    path: PATH.profile,
  },
  {
    element: <NotFound />,
    path: "*",
  },
];
