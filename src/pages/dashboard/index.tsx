import type { NextPage, GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import AuthBar from "@components/AuthBar";
import NewLinkerButton from "@components/NewLinkerButton";
import LinkerBoard from "@components/LinkerBoard";

const Dashboard: NextPage = () => {
  const session = useSession();

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AuthBar status={session.status} />
      <main>
        <h1 className=" text-center mt-5 font-extrabold text-5xl text-blue-400">
          Dashboard
        </h1>
        <LinkerBoard />
      </main>
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
