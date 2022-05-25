import type { NextPage } from "next";
import dynamic from "next/dynamic";

const Home: NextPage = () => {
  const Waveform = dynamic(() => import("../components/Waveform"), {
    ssr: false,
  });

  return (
    <div>
      <Waveform url="jp.mp3" />
    </div>
  );
};

export default Home;
