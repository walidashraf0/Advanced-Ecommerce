import { createStore, type StateSchema } from "@/app/store"
import type { ReactNode } from "react";
import { Provider } from "react-redux"

interface StoreProviderProps {
    children: ReactNode,
    intialState?: StateSchema
}
const StoreProvider = ({ children, intialState }: StoreProviderProps) => {
    const store = createStore(intialState);
    return <Provider store={store}>
        {children}
    </Provider>
}

export default StoreProvider
