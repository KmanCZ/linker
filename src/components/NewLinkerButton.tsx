import { useAtom } from "jotai";
import { modalAtom } from "../pages/dashboard/index";

export default function NewLinkerButton() {
  const [modal, setModal] = useAtom(modalAtom);

  return (
    <button
      onClick={() => setModal(true)}
      className="inline-block text-center text-4xl text-slate-300 hover:text-slate-200 border-4 border-dashed border-slate-300 hover:border-slate-200 border-thick rounded-lg w-[20rem] h-[20rem] px-20"
    >
      Add New Linker
    </button>
  );
}
