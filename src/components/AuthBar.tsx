import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AuthBar() {
  const session = useSession();

  if (session.status === "loading") {
    return (
      <section className="absolute top-3 right-3">
        <p>Loading...</p>
      </section>
    );
  }

  if (session.status === "authenticated") {
    return (
      <section className="absolute top-3 right-3">
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
      </section>
    );
  }

  return (
    <section className="absolute top-3 right-3">
      <Link href="/api/auth/signin">
        <a className="bg-blue-500 text-white text-lg p-2 m-2 rounded-xl">
          Sign In
        </a>
      </Link>
    </section>
  );
}
