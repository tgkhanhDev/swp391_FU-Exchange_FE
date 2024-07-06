import ProductList from "../components/templates/productList/ProductList";
import NotFound from "../page/NotFound";
import { PATH } from "../constants/config";
import ProductPage from "../page/ProductPage";
import PostDetail from "../components/templates/productDetail/PostDetail";
import PostList from "../components/templates/productList/PostList";
import Cart from "../components/templates/Cart/Cart";
import ProfileTemplate from "../components/templates/Account/BuyerAccount/ProfileTemplate";
import { LoginStaff } from "../components/templates/Account";
import OrderTemplate from "../components/templates/Account/BuyerAccount/OrderTemplate";
import { Login, Register, Authorize, SellerAuthorize, AdminAuthorize, ModeratorAuthorize } from "../page/account";
import { ManageCustomerAccount, ManageReportAccount, ManageStaffAccount, ProfileTemplateAdmin, ProfileAdminUpdate, AccountManager, SellerAccountManager, SellerManager } from "../components/templates/Account/Admin";
import { ManagePostProduct, ManageReportPost, ProfileTemplateModerator, ProfileModeratorUpdate } from "../components/templates/Account/Moderator";
import { UpdateProduct, ManageProduct, CreateProduct, Dashboard, Transaction, Post, ProductDetailById, Wishlist, UpdateWishlist } from "../components/templates/Account/SellerAccount";
import RegisterSeller from "../components/templates/Account/RegisterSeller";
import ReviewProduct from "../components/templates/Account/ReviewProduct"
import { Payment } from "../components/templates/Payment";
import { ShopId } from "../components/templates/shop";

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
        element: <ShopId />,
        path: PATH.shop,
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
      {
        element: <Transaction />,
        path: PATH.transaction,
      },
      {
        element: <Post />,
        path: PATH.post,
      },
      {
        element: <Wishlist />,
        path: PATH.wishlist,
      },
      {
        element: <UpdateWishlist />,
        path: PATH.wishlistUpdate,
      },
      {
        element: <ProductDetailById />,
        path: PATH.productDetailbyId,
      },
    ],
  },

  {
    element: <AdminAuthorize />,
    path: PATH.admin,
    children: [
      {
        element: <ManageCustomerAccount />,
        index: true,
      },
      {
        element: <AccountManager />,
        path: PATH.adminAccManage,
      },
      {
        element: <SellerAccountManager />,
        path: PATH.adminSellerRequest,
      },
      {
        element: <SellerManager />,
        path: PATH.adminSellerManage,
      },
      {
        element: <ManageReportAccount />,
        path: PATH.manageReportAcc,
      },
      {
        element: <ManageStaffAccount />,
        path: PATH.manageStaffAcc,
      },
      {
        element: <ProfileTemplateAdmin />,
        path: PATH.profileAdmin,
      },
      {
        element: <ProfileAdminUpdate />,
        path: PATH.profileAdminUpdate,
      },
    ],
  },

  {
    element: <ModeratorAuthorize />,
    path: PATH.moderator,
    children: [
      {
        element: <ManagePostProduct />,
        index: true,
      },
      {
        element: <ManageReportPost />,
        path: PATH.manageReportPost,
      },
      {
        element: <ProfileTemplateModerator />,
        path: PATH.profileModerator,
      },
      {
        element: <ProfileModeratorUpdate />,
        path: PATH.profileModeratorUpdate,
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
    element: <LoginStaff />,
    path: PATH.loginStaff,
  },
  {
    element: <NotFound />,
    path: "*",
  },
];
