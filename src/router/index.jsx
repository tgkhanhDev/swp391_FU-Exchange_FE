import ProductList from "../components/templates/productList/ProductList";
import NotFound from "../page/NotFound";
import { PATH } from "../constants/config";
import ProductPage from "../page/ProductPage";
import PostDetail from "../components/templates/productDetail/PostDetail";
import PostList from "../components/templates/productList/PostList";
import Cart from "../components/templates/Cart/Cart";
import Payment from "../components/templates/Payment/Payment";
import ProfileTemplate from "../components/templates/Account/BuyerAccount/ProfileTemplate";
import OrderTemplate  from "../components/templates/Account/BuyerAccount/OrderTemplate";
import { Login, Register, Authorize, SellerAuthorize } from "../page/account";
import Dashboard from "../components/templates/Account/SellerAccount/Dashboard";
import { CreateProduct, UpdateProduct, ManageProduct } from "../components/templates/Account/SellerAccount";
import RegisterSeller from "../components/templates/Account/RegisterSeller";
import ReviewProduct from "../components/templates/Account/ReviewProduct"

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
    element: <SellerAuthorize />,
    path: PATH.dashboard,
    children: [
      {
        element: <Dashboard />,
        index: true,
      },
      {
        element: <ManageProduct />,
        path: PATH.manageProduct,
      },
      {
        element: <UpdateProduct />,
        path: PATH.updateProduct,
      },
      {
        element: <CreateProduct />,
        path: PATH.createProduct,
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
