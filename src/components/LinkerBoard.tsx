import LinkerCard from "./LinkerCard";
import NewLinkerButton from "./NewLinkerButton";
import { trpc } from "utils/trpc";

export default function LinkerBoard() {
  const { data } = trpc.useQuery(["linker.getAllLinkers"]);

  return (
    <section className="min-h-[50rem] rounded-xl m-5 p-5 bg-slate-100 grid grid-cols-5 justify-items-center gap-y-7">
      {data ? (
        data.map((linker) => (
          <LinkerCard
            key={linker.id}
            name={linker.name}
            description={linker.description}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
      <NewLinkerButton />
    </section>
  );
}
