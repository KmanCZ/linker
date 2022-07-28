import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { prisma } from "../../server/db/client";
import AuthBar from "../../components/AuthBar";
import { getSession, useSession } from "next-auth/react";
import { Link as LinkModel, Linker } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import LinksList from "@components/LinksList";
import SettingsLink from "@components/SettingsLink";

const LinkerPage = ({
  linker,
  links,
  isOwner,
}: {
  linker: Linker;
  links: LinkModel[];
  isOwner: boolean;
}) => {
  const session = useSession();

  return (
    <>
      <Head>
        <title>{linker.name}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {isOwner && <AuthBar status={session.status} />}
        <div className="bg-orange-300 min-h-screen h-full w-screen flex flex-col">
          <main className="pt-20 px-[30rem]">
            <div className="bg-gray-400 bg-opacity-50 backdrop-blur-md rounded-lg p-5">
              <div className="h-16 w-16 absolute -top-7 left-1/2 -translate-x-1/2 rounded-full bg-black"></div>
              {isOwner && <SettingsLink slug={linker.slug} />}
              <h1 className="text-center text-4xl font-semibold mt-5">
                {linker.name}
              </h1>
              {/* Links */}
              <LinksList links={links} />
              {/* Social Media */}
              <ul className="flex justify-center gap-3">
                <li className="w-8 hover:text-gray-500 hover:text-opacity-60">
                  <a href="https://instagram.com">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </li>
                <li className="w-8 hover:text-gray-500 hover:text-opacity-60">
                  <a href="https://twitter.com">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </li>
              </ul>
            </div>
          </main>
          <footer className="mt-auto">
            <Link href="/">
              <a className="block text-center text-lg text-gray-700 text-opacity-60 hover:underline">
                Linker
              </a>
            </Link>
          </footer>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const slug = ctx.params?.slug as string;

  const linker = await prisma.linker.findFirst({
    where: { slug },
  });

  if (!linker) {
    return {
      notFound: true,
    };
  }
  const session = await getSession(ctx);
  const isOwner = session?.user?.id === linker.userId;

  const links = await prisma.link.findMany({ where: { linkerId: linker.id } });

  return {
    props: {
      linker,
      links,
      isOwner,
    },
  };
};

export default LinkerPage;
