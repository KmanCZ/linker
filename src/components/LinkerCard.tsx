import Link from "next/link";
import SettingsLink from "./SettingsLink";

interface LinkerCardProps {
  name: string;
  description: string;
  slug: string;
}

export default function LinkerCard({
  name,
  description,
  slug,
}: LinkerCardProps) {
  return (
    <Link href={slug}>
      <a className="inline-block w-[20rem] h-[20rem] bg-white bg-opacity-30 shadow-md hover:shadow-xl rounded-lg">
        <div className="bg-yellow-500 h-3/5 rounded-t-lg">Prewiew picture</div>
        <div className="p-4 h-2/5 relative">
          <h2 className="font-bold text-2xl text-slate-600">{name}</h2>
          <p className="line-clamp-2 mt-2">{description}</p>
          <SettingsLink slug={slug} />
        </div>
      </a>
    </Link>
  );
}
