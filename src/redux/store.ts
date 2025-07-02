import { legacy_createStore as createStore } from "redux"
import { productsReducer } from "./reducer"

export const store = createStore(productsReducer)

export type RootState = ReturnType<typeof store.getState>
