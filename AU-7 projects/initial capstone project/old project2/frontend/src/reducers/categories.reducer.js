import {
  MAKE_CATEGORY,
  CATEGORY_ERROR,
  GET_CATEGORIES,
  GET_CATEGORY,
  CLEAR_CATEGORIES,
  CLEAR_CATEGORY,
  SEARCH_CATEGORIES,
} from "../constants/categories.constants";

const initialState = {
  categories: [],
  category: null,
  isLoading: false,
  errors: {},
};

const categories = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case MAKE_CATEGORY:
    case GET_CATEGORY:
    case GET_CATEGORIES:
    case SEARCH_CATEGORIES:
    case CLEAR_CATEGORIES:
      return {
        ...state,
        categories: [],
        errors: {},
      };
    case CLEAR_CATEGORY:
      return {
        ...state,
        category: null,
        errors: {},
      };
    case CATEGORY_ERROR:
      return {
        ...state,
        errors: payload,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default categories;
