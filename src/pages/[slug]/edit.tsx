import Head from "next/head";
import { trpc } from "../../utils/trpc";
import { getSession, useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { prisma } from "../../server/db/client";
import AuthBar from "@components/AuthBar";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const EditLinkerPage = ({ slug }: { slug: string }) => {
  const { data } = trpc.useQuery(["linker.getLinker", { slug }]);
  const { status } = useSession();

  return (
    <>
      <Head>
        <title>Edit {data?.linker.name}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <AuthBar status={status} />
        <Link href={`/${slug}`}>
          <a className="flex items-center absolute left-3 opacity-40 hover:opacity-80">
            <FontAwesomeIcon icon={faAngleLeft} className="w-5 inline-block" />
            <span className="text-xl">Back</span>
          </a>
        </Link>
        <main className="mt-3">
          <h1 className="text-6xl text-center font-semibold">
            Edit {data?.linker.name} Linker
          </h1>
        </main>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  const slug = ctx.params?.slug as string;

  const linker = await prisma.linker.findFirst({
    where: { slug },
  });

  if (!linker) {
    return {
      notFound: true,
    };
  }

  if (!session || linker.userId !== session?.user?.id) {
    return {
      redirect: {
        destination: `/${slug}`,
      },
    };
  }

  return {
    props: {
      slug,
    },
  };
};

export default EditLinkerPage;
