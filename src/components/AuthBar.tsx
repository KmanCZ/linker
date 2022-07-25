import Link from "next/link";

export default function AuthBar({
  status,
}: {
  status: "loading" | "authenticated" | "unauthenticated";
}) {
  if (status === "authenticated") {
    return (
      <div className="sticky top-0">
        <section className="flex flex-row justify-between items-center px-2 bg-slate-800">
          <span className="text-white font-bold text-2xl m-2 p-2">Linker</span>
          <div>
            <Link href="/dashboard">
              <a className="bg-blue-500 text-white text-lg p-2 m-2 rounded-xl">
                Dashboard
              </a>
            </Link>
            <Link href="/api/auth/signout">
              <a className="bg-blue-500 text-white text-lg p-2 rounded-xl">
                Sign Out
              </a>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="sticky top-0">
      <section className="flex flex-row justify-between items-center px-2 bg-slate-800">
        <span className="text-white font-bold text-2xl m-2 p-2">Linker</span>

        <Link href="/api/auth/signin">
          <a className="bg-blue-500 text-white text-lg p-2 rounded-xl">
            Sign In
          </a>
        </Link>
      </section>
    </div>
  );
}
