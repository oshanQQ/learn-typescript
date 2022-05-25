import { StackDivider, VStack } from "@chakra-ui/react";
import AudioRecordPanel from "./AudioRecordPanel";
import { CsvContentUnit } from "../types/CsvContentUnit";

type Props = {
  csvContent: CsvContentUnit[];
};

const AudioRecordPanelList = ({ csvContent }: Props) => {
  console.log(csvContent);
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      {csvContent.map((data) => (
        <AudioRecordPanel
          sentence={data.phrase}
          key={data.phrase}
        ></AudioRecordPanel>
      ))}
    </VStack>
  );
};

export default AudioRecordPanelList;
