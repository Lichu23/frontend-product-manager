import {
  ActionFunctionArgs,
  Form,
  redirect,
  useFetcher,
  useNavigate,
} from "react-router-dom";
import { formatPrice } from "../../../helpers/formatPrice";
import { Product } from "../../../schema";
import { deleteProduct } from "../../../services";

type ProductDetailsProps = {
  product: Product;
};

export const action = async ({ params }: ActionFunctionArgs) => {
  if (params.id !== undefined) await deleteProduct(+params.id);
  return redirect("/");
};

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  //Se envia el name="availability" y el value
  const fetcher = useFetcher()
  const isAvailable = product.availability;
  const navigate = useNavigate();

  return (
    <tr className="border-r-2">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatPrice(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="POST">
          <button
            name="id"
            className={`${
              isAvailable
                ? "bg-green-600 hover:bg-green-500"
                : "bg-red-700 hover:bg-red-500"
            } p-1.5 rounded-lg text-white font-semibold shadow-lg`}
            value={product.id}
          >
            {isAvailable ? "Available" : "Not available"}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800">
        <div className="flex gap-2 items-center">
          <button
            className="rounded-md text-sm font-bold bg-emerald-900 hover:bg-emerald-800 text-white p-2 md:p-2 lg:p-4"
            onClick={() => navigate(`/products/${product.id}/edit`)}
          >
            Edit
          </button>

          <Form
            className="w-full"
            method="POST"
            action={`products/${product.id}/delete`}
            onSubmit={(e) => {
              if (!confirm("Do you want to delete this product!?")) {
                e.preventDefault();
              }
            }}
          >
            <button
              className="rounded-md text-sm font-bold bg-slate-800 hover:bg-slate-700 text-white p-2 md:p-2 lg:p-4"
              type="submit"
            >
              Delete
            </button>
          </Form>
        </div>
      </td>
    </tr>
  );
};
