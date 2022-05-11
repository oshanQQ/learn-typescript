import type { NextPage } from "next";
import dynamic from "next/dynamic";

const Home: NextPage = () => {
  const Waveform = dynamic(() => import("../components/Waveform"), {
    ssr: false,
  });

  return (
    <div>
      <Waveform />
    </div>
  );
};

export default Home;
