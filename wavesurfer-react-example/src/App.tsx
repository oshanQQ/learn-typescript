import WaveSurfer from "wavesurfer.js";
import { useRef, useEffect } from "react";

export default function App() {
  const waveformRef = useRef<WaveSurfer>(null!);

  useEffect(() => {
    waveformRef.current = WaveSurfer.create({
      // Type 'WaveSurfer' is not assignable to type 'string | HTMLElement'.
      container: waveformRef.current,
    });
    waveformRef.current.load("assets/test.wav");
  }, []);

  function handlePlayPause() {
    waveformRef.current.playPause();
  }

  return (
    <>
      {/* Type 'MutableRefObject<WaveSurfer>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */}
      <div ref={waveformRef}></div>
      <div id="control">
        <button onClick={handlePlayPause}>Play/Pause</button>
      </div>
    </>
  );
}
