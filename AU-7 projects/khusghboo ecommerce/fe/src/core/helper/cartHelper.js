import { isAutheticated } from "../../auth/helper/index";

export const addItemToCart = (item, next) => {
  let cart = [];
  const { user } = isAutheticated()
  //console.log('user :', user)
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...item,
      user_id: user._id
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const loadCart = () => {
  const { user } = isAutheticated()

  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      // console.log('ALl Products', JSON.parse(localStorage.getItem("cart")))
      const allProducts = JSON.parse(localStorage.getItem("cart"))
      const userProduct = allProducts.filter(product => product.user_id === user._id)

      return userProduct
    } else {
      return []
    }
  }
};

export const removeItemFromCart = (productId) => {
  const { user } = isAutheticated()

  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, i) => {
      if (product._id === productId && product.user_id === user._id) {
        cart.splice(i, 1);
      }
      return 1
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

export const cartEmpty = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};
