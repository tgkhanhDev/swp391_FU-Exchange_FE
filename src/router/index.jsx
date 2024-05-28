import ProductDetaill from "../components/templates/productDetail/ProductDetaill";
import ProductList from "../components/templates/productList/ProductList";
import ProfileTemplate from "../components/templates/Account/ProfileTemplate"
import NotFound from "../page/NotFound"
import { PATH } from "../constants/config";
import ProductPage from "../page/ProductPage";
import { Login, Register, Authorize  } from "../page";

export const router = [
  {
    element: <ProductPage />,
    path: "/",
    children: [
      {
        //element: <ProductList />,
        element: <ProductList />,
        index: true,
      },
      {
        element: <ProductDetaill />,
        path: PATH.productDetail,
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
    element: <NotFound />,
    path: "*",
  },
];
