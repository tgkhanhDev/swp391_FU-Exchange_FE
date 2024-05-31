import ProductList from "../components/templates/productList/ProductList";
import NotFound from "../page/NotFound"
import { PATH } from "../constants/config";
import ProductPage from "../page/ProductPage";
import PostDetail from "../components/templates/productDetail/PostDetail";
import PostList from "../components/templates/productList/PostList";
import Cart from "../components/templates/Account/Cart";
import ProfileTemplate from "../components/templates/Account/ProfileTemplate"
import { Login, Register, Authorize  } from "../page";
import RegisterSeller from "../components/templates/Account/RegisterSeller";

export const router = [
  {
    element: <ProductPage />,
    path: "/",
    children: [
      {
        element: <ProductList />,
        index: true,
      },
      {
        element: <PostList />,
        path: PATH.postList,
      },
      {
        element: <PostDetail />,
        path: PATH.productDetail,
      },
      {
        element: <Cart />,
        path: PATH.cart,
      },
    ],
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
    element: <RegisterSeller />,
    path: PATH.registerSeller,
  },
  {
    element: <PostList />, //AccountInfo
    path: PATH.profile,
  },
  {
    element: <NotFound />,
    path: '*'
  }
];
