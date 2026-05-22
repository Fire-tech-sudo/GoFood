import React, { createContext, useReducer, useContext, useEffect } from "react";

// --- Reducer ---
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD": {
            const existingIndex = state.findIndex(item => item.id === action.id && item.size === action.size);
            if (existingIndex !== -1) {
                const updated = [...state];
                updated[existingIndex].qty += action.qty;
                updated[existingIndex].price += action.price;
                return updated;
            }
            return [...state, action];
        }

        case "REMOVE":
            return state.filter((_, i) => i !== action.index);

        case "UPDATE": {
            const updated = [...state];
            const item = updated[action.index];
            if (!item) return state;

            const unitPrice = item.price / item.qty;
            updated[action.index] = {
                ...item,
                qty: action.qty,
                price: unitPrice * action.qty
            };
            return updated;
        }

        case "DROP":
            return [];

        default:
            return state;
    }
};

// --- Context setup ---
const CartStateContext = createContext();
const CartDispatchContext = createContext();

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [], () => {
        try {
            const localData = JSON.parse(localStorage.getItem("cart"));
            return Array.isArray(localData) ? localData.filter(Boolean) : [];
        } catch {
            return [];
        }
    });

    // Save cart to localStorage on change
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state));
    }, [state]);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

// --- Custom Hooks ---
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
