import {createBrowserRouter} from "react-router-dom"
import Layout from "./layouts/Layout"
import Products, { action as updateAvailabilityAction, loader as productsLoader } from "./views/Products/Products"
import NewProducts, {action as newProductAction} from "./views/Products/NewProducts"
import EditProduct, { loader as editProductLoader, action as editProductAction} from "./views/Products/EditProduct"
import { action as deleteProductAction } from "./views/Products/components"
export const router = createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            {
                index:true,
                element: <Products/>,
                loader: productsLoader,
                action: updateAvailabilityAction
            },
            {
                path: "products/new",
                element: <NewProducts/>,
                action: newProductAction
            },
            {
                path: "products/:id/edit", //ROA Pattern - Resource-oriented design
                element: <EditProduct/>,
                loader:editProductLoader,
                action:editProductAction
            },
            {
                path: "products/:id/delete", //ROA Pattern - Resource-oriented design
                action:deleteProductAction

            }
        ]
    }
])