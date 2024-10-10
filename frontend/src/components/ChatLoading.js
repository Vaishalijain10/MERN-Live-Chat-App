import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

function ChatLoading() {
  return (
    <Stack>
      <Skeleton height="45" />
      <Skeleton height="45" />
      <Skeleton height="45" />
      <Skeleton height="45" />
      <Skeleton height="45" />
      <Skeleton height="45" />
    </Stack>
  );
}

export default ChatLoading;
