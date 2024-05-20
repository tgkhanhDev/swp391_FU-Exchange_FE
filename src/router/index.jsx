import ProductDetaill from "../components/templates/productDetail/ProductDetaill";
import ProductList from "../components/templates/productList/ProductList";
import NotFound from "../page/NotFound"
import { PATH } from "../constants/config";
import ProductPage from "../page/ProductPage";

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
        element: <ProductDetaill />,
        path: PATH.productDetail
      }
    ],
  },
  {
    element: <NotFound />,
    path: '*'
  }
];
