import WaveSurfer from 'wavesurfer.js';
import { useRef } from "react";

const App = () => {
  const waveformRef: any = useRef(null);
  var context: any = null;

  const handlePlayPause = () => {
    waveformRef.current.playPause();
    console.log("handlePlayPause")
  }

  const handleChangeFile = (e: any) => {
    if (context == null) {
      window.AudioContext = window.AudioContext;
      context = new AudioContext();

      waveformRef.current = WaveSurfer.create({
        container: waveformRef.current,
        audioContext: context,
      });
    }

    const file = e.target.files[0]
    if (file) {
      const fileUrl = URL.createObjectURL(file)
      waveformRef.current.load(fileUrl);
    }
  }

  return (
    <div>
      <div ref={waveformRef}></div>
      <input type="file" accept="audio/*" onChange={(e) => handleChangeFile(e)} />
      <button onClick={handlePlayPause}>Play/Pause</button>
    </div>
  );
}

export default App;
