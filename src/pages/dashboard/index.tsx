import type { NextPage, GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import AuthBar from "@components/AuthBar";
import LinkerBoard from "@components/LinkerBoard";
import NewLinkerModal from "@components/NewLinkerModal";
import { atom, useAtom } from "jotai";

export const modalAtom = atom<boolean>(false);

const Dashboard: NextPage = () => {
  const session = useSession();
  const [modal] = useAtom(modalAtom);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={modal ? "overflow-hidden h-screen" : ""}>
        <AuthBar status={session.status} />
        <main>
          <h1 className=" text-center mt-5 font-extrabold text-5xl text-blue-400">
            Dashboard
          </h1>
          <LinkerBoard />
          <NewLinkerModal />
        </main>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
};

export default Dashboard;
