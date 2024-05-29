import NotFound from "../page/NotFound"
import { PATH } from "../constants/config";
import ProductPage from "../page/ProductPage";
import PostDetail from "../components/templates/productDetail/PostDetail";
import PostList from "../components/templates/productList/PostList";
import ProfileTemplate from "../components/templates/Account/ProfileTemplate"
import { Login, Register, Authorize  } from "../page";
import { LoginTemplate, RegisterTemplate } from "../components/templates/Account";

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
    element: <LoginTemplate />, //Login
    path: PATH.login,
  },
  {
    element: <RegisterTemplate/>, //Register
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
