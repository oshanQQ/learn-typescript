import { StackDivider, VStack } from "@chakra-ui/react";
import AudioRecordPanel from "./AudioRecordPanel";

const AudioRecordPanelList = () => {
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      <AudioRecordPanel sentence="こんにちは"></AudioRecordPanel>
      <AudioRecordPanel sentence="こんにちは"></AudioRecordPanel>
      <AudioRecordPanel sentence="こんにちは"></AudioRecordPanel>
      <AudioRecordPanel sentence="こんにちは"></AudioRecordPanel>
    </VStack>
  );
};

export default AudioRecordPanelList;
