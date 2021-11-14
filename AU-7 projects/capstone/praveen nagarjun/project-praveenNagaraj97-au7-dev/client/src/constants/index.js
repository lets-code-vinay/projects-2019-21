export const GLOBAL_ERROR = "@global/GLOBAL_ERROR";
export const GLOBAL_SUCCESS = "@global/GLOBAL_SUCCESS";
export const GLOBAL_SUCCESS_WITH_IMG = "@global/GLOBAL_SUCCESS_WITH_IMG";

export const ALERT_DURATION = 3200;
export const WEBSITE_LOAD = "@app-load-saga/WEBSITE_LOAD";

export const IS_LOADING = "@global-saga/IS_LOADING";

export const USER_AUTH_TYPES = {
  LOGIN: {
    LOAD_LOGIN: "@userauth/LOAD_LOGIN",
    LOAD_LOGGGED_USER: "@user-saga/LOAD_LOGGED_USER",
  },
  SIGNUP: {
    LOAD_SIGNUP: "@userauth/LOAD_SIGNUP",
    LOAD_SIGNED_UP_USER: "@user-saga/LOAD_SIGNED_UP_USER",
  },

  USER_STATUS: {
    LOAD_ACCREDITATION: "@app-load-saga/LOAD_ACCREDITATION",
    IS_LOGGED_IN: "@app-load-saga/IS_LOGGED_IN",
    LOAD_USER: "@user-settings/LOAD_USER",
    GET_USER: "@user-settings/GET_USER",
  },

  USER_LOGOUT: {
    LOAD_LOGOUT: "@usermenu/LOAD_LOGOUT",
  },

  USER_PASSWORD: {
    LOAD_FORGOT_PASSWORD: "@userauth/LOAD_FORGOT_PASSWORD",
    LOAD_RESET_PASSWORD: "@emailed-link/LOAD_RESET_PASSWORD",
  },

  USER_UPDATE: {
    USER_PASSWORD_CHANGE: "@user-settings/USER_PASSWORD_CHANGE",
  },
};

export const COOKIE_NAMES = {
  AUTH_TOKEN: "AUTH_TOKEN",
  CART_ITEMS: "CART_ITEMS",
};

export const RE_OCCURING_REQUESTS = {
  RE_OCCURING_PRODUCT_DETAIL: "@requests-saga/RE_OCCURING_PRODUCT_DETAIL",
};

export const PRODUCT_TYPES = {
  GET_ALL_CATEGORIES: "@apploadsaga/GET_ALL_CATEGORIES",

  LOAD_GET_PRODUCTS_BASED_ON_QUERY:
    "@categories-header/LOAD_GET_PRODUCTS_BASED_ON_QUERY",
  GET_PRODUCTS_BASED_ON_QUERY: "@products-saga/GET_PRODUCTS_BASED_ON_QUERY",
  HOLD_PREVIOUS_REQUESTED_QUERY: "@products-saga/HOLD_PREVIOUS_REQUESTED_QUERY",
  SET_NUMBER_OF_RESULTS_PERPAGE: "@products-saga/SET_NUMBER_OF_RESULTS_PERPAGE",
  SET_PAGE_NUMBER: "@products-saga/SET_PAGE_NUMBER",
  NO_MORE_RESULTS_FOUND: "@productslist/NO_MORE_RESULTS_FOUND",

  ADD_PRODUCT_TO_CART: "@products/ADD_PRODUCT_TO_CART",
  REMOVE_PRODUCT_FROM_CART: "@productcart/REMOVE_PRODUCT_FROM_CART",
  LOAD_PRODUCT_CART: "@productcart/LOAD_PRODUCT_CART",
  GET_PRODUCTS_IN_CART: "@productcart/GET_PRODUCTS_IN_CART",
  SET_BACK_REACHED_LIMIT: "@cart-sage/SET_BACK_REACHED_LIMIT",

  LOAD_VIEW_PRODUCT_DETAIL: "@productdetailview/LOAD_VIEW_PRODUCT_DETAIL",
  PRODUCT_DETAIL: "@productdetailview/PRODUCT_DETAIL",

  LOAD_PRODUCT_REVIEWS: "@review/LOAD_PRODUCT_REVIEWS",
  GET_PRODUCT_REVIEWS: "@review/GET_PRODUCT_REVIEWS",
  REVIEW_FOUND_HELPFUL: "@review/REVIEW_FOUND_HELPFUL",

  LOAD_NEW_PRODUCT_REVIEW: "@addedreview/LOAD_NEW_PRODUCT_REVIEW",

  SORT_PRODUCTS_ASCE: "@productlistfeatures/SORT_PRODUCTS_ASCE",
  SORT_PRODUCTS_DESC: "@productlistfeatures/SORT_PRODUCTS_DESC",
  SORT_BY_FEATURED: "@productlistfeatures/SORT_BY_FEATURED",
};

export const LOADERS = {
  CATEGORY_LOADING: "@websiteloadsaga/CATEGORY_LOADING",
  PRODUCTS_LISTS_LOADING: "@productslistsaga/PRODUCTS_LISTS_LOADING",
  REVIEW_LOADING: "@productreviewsaga/REVIEW_LOADING",
  AUTH_LOADING: "@authsaga/AUTH_LOADING",
  CHECKOUT_LOADING: "@cart-saga/CHECKOUT_LOADING",
};

export const RECENT_VIEWED = "@home-manage-saga/RECENT_VIEWED";

export const PAYMENT_TYPES = {
  LOAD_CHECKOUT: "@cart/LOAD_CHECKOUT",
  CHECKOUT_SUCCESS: "@cart-saga/CHECKOUT_SUCCESS",
  ORDER_SUCCESS: "@checkout/ORDER_SUCCESS",
  ORDER_FAILED: "@checkout/ORDER_FAILED",
};

export const SAVE_ADDRESS = "@checkout/SAVE_ADDRESS";