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

export const setItems = (items: Item[]) => ({ type: SET_ITEMS, payload: items })
export const setSearch = (search: string) => ({ type: SET_SEARCH, payload: search })
export const toggleFilter = (filter: PricingOptionTypes) => ({ type: TOGGLE_FILTER, payload: filter })
export const resetFilters = () => ({ type: RESET_FILTERS })
export const setPriceRange = (min: number, max: number) => ({
    type: SET_PRICE_RANGE,
    payload: { min, max },
})
export const incrementPage = () => ({ type: INCREMENT_PAGE })
export const setPage = (page: number) => ({ type: SET_PAGE, payload: page })
