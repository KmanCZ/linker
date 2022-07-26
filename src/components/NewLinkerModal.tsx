import { useAtom } from "jotai";
import { modalAtom } from "../pages/dashboard/index";
import { FormEvent, useState } from "react";
import { trpc } from "utils/trpc";
import Router from "next/router";

export default function NewLinkerModal() {
  const [modal, setModal] = useAtom(modalAtom);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { mutate } = trpc.useMutation("linker.create", {
    onSuccess: ({ slug }) => {
      Router.push(slug);
    },
  });

  function submitHandler(e: FormEvent) {
    e.preventDefault();
    mutate({ name, description });
  }

  return (
    <div hidden={!modal}>
      <div
        onClick={() => setModal(false)}
        className="bg-white bg-opacity-50 backdrop-blur absolute top-0 w-full min-h-full"
      ></div>

      <form
        onSubmit={submitHandler}
        className="bg-white p-5 rounded-lg shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2"
      >
        <span
          onClick={() => setModal(false)}
          className="absolute right-5 text-lg text-black cursor-pointer hover:text-gray-300"
        >
          ✕
        </span>
        <h3 className="font-semibold text-3xl mb-3">Create New Linker</h3>
        <div className="flex flex-col mb-2">
          <label htmlFor="name" className="text-xl mb-1">
            Linker Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="border border-black rounded-lg h-10 px-2 text-lg"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-xl mb-1">
            Description
          </label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            className="border border-black rounded-lg h-36 p-2 text-lg resize-none"
          ></textarea>
        </div>
        <button
          className="w-full mt-3 py-1 rounded-lg text-xl text-white bg-blue-500 hover:bg-blue-600"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
}
