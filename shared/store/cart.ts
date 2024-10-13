import { create } from "zustand";
import { Api } from "../services/api-client";
import { getCartDetails } from "../lib";
import { CartStateItem } from "../lib/get-cart-details";
import { CreateCartItemValues } from "../services/dto/cart.dto";

//--------------------------------------------------------------------------------------------------------------------------------

/**
 * Интерфейс состояния корзины
 *
 * @property {boolean} loading - Индикатор загрузки
 * @property {boolean} error - Индикатор ошибки
 * @property {number} totalAmount - Общая сумма в корзине
 * @property {CartStateItem[]} items - Элементы в корзине
 * @property {(id: number, quantity: number) => Promise<void>} updateItemQuantity - Обновляет количество товара
 * @property {(values: CreateCartItemValues) => Promise<void>} addCartItem - Добавляет товар в корзину
 * @property {(id: number) => Promise<void>} removeCartItem - Удаляет товар из корзины
 */
export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];
  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: any) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}

//--------------------------------------------------------------------------------------------------------------------------------

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  // GET /api/cart
  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.getCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  // PATCH /api/cart/:id
  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.updateItemQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  // DELETE /api/cart/:id
  removeCartItem: async (id: number) => {
    try {
      set((state) => ({
        loading: true,
        error: false,
        items: state.items.map((item) => (item.id === id ? { ...item, disabled: true } : item)),
      }));
      const data = await Api.cart.removeCartItem(id);
      set(getCartDetails(data));
    } catch (error) {
      set({ error: true });
      console.error(error);
    } finally {
      set((state) => ({ loading: false, items: state.items.map((item) => ({ ...item, disabled: false })) }));
    }
  },

  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.addCartItem(values);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
