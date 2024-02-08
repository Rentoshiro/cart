import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map() };
  }

  if (action.type === REMOVE) {
    const newCart = new Map(state.cart);
    newCart.delete(action.id);
    return { ...state, cart: newCart };
  }

  if (action.type === INCREASE) {
    const newCart = new Map(state.cart);
    const item = newCart.get(action.id);
    const newItem = { ...item, amount: item.amount + 1 };
    newCart.set(action.id, newItem);
    return { ...state, cart: newCart };
  }

  if (action.type === DECREASE) {
    const newCart = new Map(state.cart);
    const item = newCart.get(action.id);
    const newItem = { ...item, amount: item.amount - 1 };
    newCart.set(action.id, newItem);
    if (newItem.amount < 1) {
      newCart.delete(action.id);
    }
    return { ...state, cart: newCart };
  }

  if (action.type === LOADING) {
    return { ...state, loading: true };
  }

  if (action.type === DISPLAY_ITEMS) {
    const newCart = new Map(action.cart.map((item) => [item.id, item]));
    return { ...state, loading: false, cart: newCart };
  }

  throw new Error(`no matching action type: ${action.type}`);
};

export default reducer;
