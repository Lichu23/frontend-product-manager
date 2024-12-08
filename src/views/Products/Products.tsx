import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom";
import { getProducts, updateProductAvailability } from "../../services";
import { Product } from "../../schema";
import { ProductDetails } from "./components";

export async function loader() {
  const products = await getProducts();

  return products;
}

export async function action({request}: ActionFunctionArgs) {
 const data = Object.fromEntries(await request.formData())
 await updateProductAvailability(+data.id)

  return {};
}

export default function Products() {
  const products = useLoaderData() as Product[];

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl lg:text-4xl md:text-3xl font-black text-slate-500">
          Products
        </h2>
        <Link
          to="products/new"
          className="rounded-md text-sm md:text-xl font-bold bg-slate-800 hover:bg-slate-700 text-white p-2 md:p-4 lg:p-4"
        >
          Add Product
        </Link>
      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Products</th>
              <th className="p-2">Price</th>
              <th className="p-2">Availability</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductDetails product={product} key={product.id} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
