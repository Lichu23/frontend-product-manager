import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header className="bg-slate-800">
        <div className="p-4 lg:p-8 text-center">
          <h1 className="text-xl md:text-4xl lg:text-5xl font-extrabold text-white">
            Product Manager
          </h1>
        </div>
      </header>

      <main className="mt-10 p-10 bg-white shadow-lg mx-5 lg:mx-32 md:mx-20">
        <Outlet />
      </main>
    </>
  );
}
