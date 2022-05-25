import { useState } from "react";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useReactMediaRecorder } from "react-media-recorder";

type Props = {
  sentence: string;
};

const AudioRecordingPanel = ({ sentence }: Props) => {
  const [isRecording, setIsRecording] = useState(false);
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    {
      audio: true,
      blobPropertyBag: { type: "audio.wav" },
    }
  );

  const onStart = () => {
    startRecording();
    setIsRecording(true);
  };
  const onStop = () => {
    stopRecording();
    setIsRecording(false);
  };

  return (
    <VStack align="start">
      <HStack direction="row" spacing={4}>
        <Button
          colorScheme="red"
          width={24}
          variant={isRecording ? "solid" : "ghost"}
          disabled={isRecording}
          onClick={onStart}
        >
          {isRecording ? "録音中" : "録音する"}
        </Button>
        <Button
          colorScheme="gray"
          variant="ghost"
          disabled={!isRecording}
          onClick={onStop}
        >
          停止
        </Button>
        <Text fontWeight="bold" textColor="gray.700">
          {sentence}
        </Text>
      </HStack>
      <audio src={mediaBlobUrl!} controls />
    </VStack>
  );
};

export default AudioRecordingPanel;
