import type { NextPage, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import AuthBar from "../../components/AuthBar";

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AuthBar />
      <h1>Dashboard</h1>
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
