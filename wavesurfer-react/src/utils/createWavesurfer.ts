// wavesurferがexportしているmoduleに対し、別名をつけている。
// Wavesurferの生成にしか使わないから。
import WaveSurferFactory from "wavesurfer.js"
import { WaveSurferParams } from "wavesurfer.js/types/params"

// 返り血をエラー型で包むみたいなことはしないんだ。
export default function reateWavesurfer(options: WaveSurferParams): WaveSurferFactory {
    return WaveSurferFactory.create(options);
}
