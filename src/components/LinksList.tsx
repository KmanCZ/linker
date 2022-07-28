import { Link as LinkModel } from "@prisma/client";
import { useAtom } from "jotai";
import { modalAtom } from "pages/[slug]";

export default function LinksList({ links }: { links: LinkModel[] }) {
  return (
    <ul className="relative flex flex-col gap-1 items-center my-2">
      {links.map((link) => (
        <Link key={link.id} href={link.url}>
          {link.name}
        </Link>
      ))}
    </ul>
  );
}

function Link({ children, href }: { children: string; href: string }) {
  return (
    <li className="w-full my-2 py-1 text-center rounded-full bg-white hover:bg-gray-200 hover:bg-opacity-60 cursor-pointer text-2xl bg-opacity-60">
      <a className="block" href={href}>
        {children}
      </a>
    </li>
  );
}

function EditLinksButton({ areLinks }: { areLinks: boolean }) {
  const [modal, setModal] = useAtom(modalAtom);
  if (areLinks) {
    return (
      <button
        onClick={() => setModal(true)}
        className="absolute top-0 left-0 min-h-10 min-w-10 w-full h-full bg-gray-100 bg-opacity-80 backdrop-blur-md opacity-0 hover:opacity-100 rounded-lg text-2xl"
      >
        Edit Links
      </button>
    );
  }
  return (
    <button
      className="text-xl opacity-40 hover:opacity-100 hover:bg-gray-300 hover:bg-opacity-60 rounded-lg p-1"
      onClick={() => setModal(true)}
    >
      Add Link
    </button>
  );
}
