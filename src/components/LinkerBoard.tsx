import LinkerCard from "./LinkerCard";
import NewLinkerButton from "./NewLinkerButton";

export default function LinkerBoard() {
  return (
    <section className="min-h-[50rem] rounded-xl m-5 p-5 bg-slate-100 grid grid-cols-5 justify-items-center gap-y-7">
      <LinkerCard />
      <LinkerCard />
      <LinkerCard />
      <LinkerCard />
      <LinkerCard />
      <LinkerCard />
      <LinkerCard />
      <LinkerCard />
      <LinkerCard />
      <NewLinkerButton />
    </section>
  );
}
