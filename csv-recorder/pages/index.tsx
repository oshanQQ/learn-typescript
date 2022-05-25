import type { NextPage } from "next";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import AudioRecordPanelList from "../components/AudioRecordPanelList";

const Home: NextPage = () => {
  return (
    <Box padding={10}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AudioRecordPanelList />
    </Box>
  );
};

export default Home;
