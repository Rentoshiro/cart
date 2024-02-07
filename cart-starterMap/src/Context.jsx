import { useContext, createContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import cartItems from "./data";

import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from "./actions";
import { getTotals } from "./utils";

const url = "https://www.course-api.com/react-useReducer-cart-project";

const AppContext = createContext();

const initialState = {
  loading: false,
  cart: new Map(),
};

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { totalAmount, totalCost } = getTotals(state.cart);

  function clearCart() {
    dispatch({ type: CLEAR_CART });
  }

  function removeItem(id) {
    dispatch({ id, type: REMOVE });
  }

  function increaseItem(id) {
    dispatch({ id, type: INCREASE });
  }

  function decreaseItem(id) {
    dispatch({ id, type: DECREASE });
  }

  const fetchData = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(url);
    const cart = await response.json();
    console.log(cart);
    dispatch({ type: DISPLAY_ITEMS, cart });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseItem,
        decreaseItem,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(AppContext);
}
