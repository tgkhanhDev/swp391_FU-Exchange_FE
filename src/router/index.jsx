import ProductDetaill from "../components/templates/productDetail/ProductDetaill";
import ProductList from "../components/templates/productList/ProductList";
import ProfileTemplate from "../components/templates/Account/ProfileTemplate";
import NotFound from "../page/NotFound";
import { PATH } from "../constants/config";
import ProductPage from "../page/ProductPage";
import { Login, Register, Authorize } from "../page";

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
    element: <Authorize />,
    path: PATH.authorize,
    children: [
      {
        element: <ProfileTemplate />,
        index: true,
      },
    ],
  },
  {
    element: <Login />,
    path: PATH.login,
  },
  {
    element: <Register />,
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
