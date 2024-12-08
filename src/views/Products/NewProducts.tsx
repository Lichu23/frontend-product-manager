import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useActionData,
} from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import { addProduct } from "../../services";
import { ProductForm } from "../../components";

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = "";

  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }

  if (error.length) {
    return error;
  }

  await addProduct(data);
  return redirect("/");
}

export default function NewProducts() {
  const error = useActionData() as string;

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl lg:text-4xl md:text-3xl font-black text-slate-500">
          Add Product
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
       <ProductForm />
        <button
          type="submit"
          className="mt-5 w-full bg-slate-800 hover:bg-slate-700 p-2 text-white font-bold text-lg cursor-pointer rounded"
        >Register Product</button>
      </Form>
    </>
  );
}
