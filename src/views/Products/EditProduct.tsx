import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import { Product } from "../../schema";
import { getProductById, updateProduct } from "../../services";
import { ProductForm } from "../../components";

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const product = await getProductById(+params.id);

    if (!product) {
      return redirect("/");
    }

    return product;
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = "";

  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }

  if (error.length) {
    return error;
  }

  if (params.id !== undefined) {
    await updateProduct(data, +params.id);
    return redirect("/");
  }
}

export default function EditProduct() {
  const product = useLoaderData() as Product;
  const error = useActionData() as string;
  const availabilityOptions = [
    { name: "Available", value: true },
    { name: "Not Available", value: false },
  ];
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl lg:text-4xl md:text-3xl font-black text-slate-500">
          Edit Product
        </h2>
        <Link
          to="/"
          className="rounded-md text-sm md:text-xl font-bold bg-slate-800 hover:bg-slate-700 text-white p-2 md:p-4 lg:p-4"
        >
          Return to products
        </Link>
      </div>

      {error && <ErrorMessage children={error} />}
      <Form className="mt-10" method="POST">
        <ProductForm product={product} />
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Availability:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="mt-5 w-full bg-slate-800 hover:bg-slate-700 p-2 text-white font-bold text-lg cursor-pointer rounded"
        >
          Save Changes
        </button>
      </Form>
    </>
  );
}
