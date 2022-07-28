import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function SettingsLink({ slug }: { slug: string }) {
  return (
    <div className="w-8 right-5 absolute text-gray-300 opacity-40 hover:opacity-80">
      <Link href={slug + "/edit"}>
        <a>
          <FontAwesomeIcon icon={faGear} />
        </a>
      </Link>
    </div>
  );
}
