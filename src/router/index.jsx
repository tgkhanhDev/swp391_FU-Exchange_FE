import ProductList from "../components/templates/productList/ProductList";
import NotFound from "../page/NotFound";
import { PATH } from "../constants/config";
import ProductPage from "../page/ProductPage";
import PostDetail from "../components/templates/productDetail/PostDetail";
import PostList from "../components/templates/productList/PostList";
import Cart from "../components/templates/Cart/Cart";
import ProfileTemplate from "../components/templates/Account/BuyerAccount/ProfileTemplate";
import { LoginStaff } from "../components/templates/Account";
import OrderTemplate  from "../components/templates/Account/BuyerAccount/OrderTemplate";
import { Login, Register, Authorize, SellerAuthorize, AdminAuthorize } from "../page/account";
import { AdminDashboard } from "../components/templates/Account/Admin";
import Dashboard from "../components/templates/Account/SellerAccount/Dashboard";
import { UpdateProduct, ManageProduct, CreateProduct } from "../components/templates/Account/SellerAccount";
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
    element: <AdminAuthorize />,
    path: PATH.admin,
    children: [
      {
        element: <AdminDashboard />,
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
    element: <LoginStaff/>,
    path: PATH.loginStaff,
  },
  {
    element: <NotFound />,
    path: "*",
  },
];
