import { PluginDefinition } from "wavesurfer.js/types/plugin";
import { PluginType } from "../containers/WaveSurfer";

export default function createPlugin(pluginObj: PluginType) {
  const { plugin, options, creator = "create" } = pluginObj;

  // ここわからん
  const createMethod: any = plugin[creator as keyof typeof plugin];

  if (!plugin) throw new Error(`Please pass a valid plugin in plugin list`);
  if (!creator)
    throw new Error(
      `Please pass the creator function name in 'creator' property.`
    );

  // ここわからん
  if (createMethod instanceof Function === false) {
    throw new Error(
      `"${creator}" is not callable on given plugin. Please pass a valid 'creator' in plugins list.`
    );
  }

  // やってることは、引数からplugin配列だけ抜きだすだけ
  return createMethod(options);
}
