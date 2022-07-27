import { Link as LinkModel } from "@prisma/client";

export default function LinksList({ links }: { links: LinkModel[] }) {
  return (
    <>
      <ul className="flex flex-col gap-1 items-center">
        {links.map((link) => (
          <Link key={link.id} href={link.url}>
            {link.name}
          </Link>
        ))}
      </ul>
    </>
  );
}

function Link({ children, href }: { children: string; href: string }) {
  return (
    <li className="w-full mb-4 text-center rounded-full bg-white hover:bg-gray-200 hover:bg-opacity-60 cursor-pointer text-2xl bg-opacity-60">
      <a className="block" href={href}>
        {children}
      </a>
    </li>
  );
}
