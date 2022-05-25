import { useState } from "react";
import { Box, Button, HStack, Text } from "@chakra-ui/react";

type Props = {
  sentence: string;
};

const AudioRecordingPanel = ({ sentence }: Props) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <HStack direction="row" spacing={4}>
      <Button
        colorScheme="red"
        width={24}
        variant={isClicked ? "solid" : "ghost"}
        disabled={isClicked}
        onClick={() => setIsClicked(!isClicked)}
      >
        {isClicked ? "録音中" : "録音する"}
      </Button>
      <Button
        colorScheme="gray"
        variant="ghost"
        disabled={!isClicked}
        onClick={() => setIsClicked(false)}
      >
        停止
      </Button>
      <Text fontWeight="bold" textColor="gray.700">
        {sentence}
      </Text>
    </HStack>
  );
};

export default AudioRecordingPanel;
