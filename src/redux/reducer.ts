import {
    SET_ITEMS,
    SET_SEARCH,
    TOGGLE_FILTER,
    RESET_FILTERS,
    SET_PRICE_RANGE,
    INCREMENT_PAGE,
    SET_PAGE,
} from "./types"
import type { PricingOptionTypes } from "../models/pricing"
import type { Item } from "../models/Item"

export interface ProductsState {
    allItems: Item[]
    search: string
    filters: PricingOptionTypes[]
    minPrice: number
    maxPrice: number
    page: number
}

const initialState: ProductsState = {
    allItems: [],
    search: "",
    filters: [],
    minPrice: 0,
    maxPrice: 999,
    page: 1,
}

export const productsReducer = (state = initialState, action: any): ProductsState => {
    switch (action.type) {
        case SET_ITEMS:
            return { ...state, allItems: action.payload }
        case SET_SEARCH:
            return { ...state, search: action.payload, page: 1 }
        case TOGGLE_FILTER:
            return state.filters.includes(action.payload)
                ? { ...state, filters: state.filters.filter((f) => f !== action.payload), page: 1 }
                : { ...state, filters: [...state.filters, action.payload], page: 1 }
        case RESET_FILTERS:
            return { ...state, search: "", filters: [], minPrice: 0, maxPrice: 999, page: 1 }
        case SET_PRICE_RANGE:
            return { ...state, minPrice: action.payload.min, maxPrice: action.payload.max, page: 1 }
        case INCREMENT_PAGE:
            return { ...state, page: state.page + 1 }
        case SET_PAGE:
            return { ...state, page: action.payload }
        default:
            return state
    }
}
