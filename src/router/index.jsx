import ProductDetaill from "../components/templates/productDetail/ProductDetaill";
import ProductList from "../components/templates/productList/ProductList";
import AuthLayout from "../components/layouts/AuthLayout";
import NotFound from "../page/NotFound"
import { PATH } from "../constants/config";
import ProductPage from "../page/ProductPage";
import { Login, Register, Profile } from "../page";

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
    element: <AuthLayout />,
    children: [
      {
        element: <Login />,
        path: PATH.login,
        index: true,
      },
      {
        element: <Register />,
        path: PATH.register,
      },
      {
        element: <Profile />,
        path: PATH.profile,
      },

    ],
  },
  {
    element: <NotFound />,
    path: "*",
  },
];
