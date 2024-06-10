import ProductList from "../components/templates/productList/ProductList";
import NotFound from "../page/NotFound";
import { PATH } from "../constants/config";
import ProductPage from "../page/ProductPage";
import PostDetail from "../components/templates/productDetail/PostDetail";
import PostList from "../components/templates/productList/PostList";
import Cart from "../components/templates/Cart/Cart";
import ProfileTemplate from "../components/templates/Account/BuyerAccount/ProfileTemplate";
import OrderTemplate  from "../components/templates/Account/BuyerAccount/OrderTemplate";
import { Login, Register, Authorize } from "../page/account";
import RegisterSeller from "../components/templates/Account/RegisterSeller";
import ReviewProduct from "../components/templates/Account/ReviewProduct"
import { Payment } from "../components/templates/Payment";

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
      {
        element: <ReviewProduct />,
        path: PATH.review,
      },
      {
        element: <Payment />,
        path: PATH.payment,
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
      {
        element: <OrderTemplate />,
        path: PATH.order,
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
    element: <NotFound />,
    path: "*",
  },
];
