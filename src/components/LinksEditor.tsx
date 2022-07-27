import { Link } from "@prisma/client";
import { useAtom } from "jotai";
import { modalAtom } from "pages/[slug]";
import { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LinksEditor({ links }: { links: Link[] }) {
  const [modal, setModal] = useAtom(modalAtom);
  const [linksState, setLinksState] = useState<Link[]>(links);
  const [newLinks, setNewLinks] = useState<{ name: string; url: string }[]>([]);

  return (
    <div hidden={!modal}>
      <div
        onClick={() => setModal(false)}
        className="bg-white bg-opacity-50 backdrop-blur absolute top-0 left-0 w-full min-h-full"
      ></div>
      <form className="bg-white p-5 rounded-lg shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2">
        <span
          onClick={() => setModal(false)}
          className="absolute right-5 text-lg text-black cursor-pointer hover:text-gray-300"
        >
          ✕
        </span>
        <h3 className="font-semibold text-3xl mb-3">Edit Links</h3>
        {linksState.map((link) => (
          <LinkEditCard key={link.id} name={link.name} url={link.url} />
        ))}
        {newLinks.map((link) => (
          <LinkEditCard key={Math.random()} />
        ))}
        <button
          type="button"
          onClick={() => setNewLinks([...newLinks, { name: "", url: "" }])}
          className="text-md text-center w-full h-10 bg-gray-300 opacity-30 hover:opacity-100 rounded-lg p-1"
        >
          <div className="w-5 mx-auto">
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </button>
        <button className="w-full mt-3 py-1 rounded-lg text-xl text-white bg-blue-500 hover:bg-blue-600">
          Save
        </button>
      </form>
    </div>
  );
}

function LinkEditCard({ name, url }: { name?: string; url?: string }) {
  const [nameState, setNameState] = useState<string>(name ? name : "");
  const [urlState, setUrlState] = useState<string>(url ? url : "");

  return (
    <section className="mb-2 flex flex-row items-center gap-2 bg-gray-300 rounded-lg p-2">
      <div className="flex flex-row items-center justify-center gap-1">
        <label htmlFor="name" className="text-xl mb-1">
          Link Name
        </label>
        <input
          type="text"
          required
          value={nameState}
          onChange={(e) => setNameState(e.target.value)}
          id="name"
          className="border border-black rounded-lg h-9 px-2 text-lg"
        />
      </div>
      <div className="flex flex-row items-center justify-center gap-1">
        <label htmlFor="url" className="text-xl mb-1">
          Link URL
        </label>
        <input
          type="url"
          required
          value={urlState}
          onChange={(e) => setUrlState(e.target.value)}
          id="url"
          className="border border-black rounded-lg h-9 px-2 text-lg"
        />
      </div>
    </section>
  );
}
