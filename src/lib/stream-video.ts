import "server-only";

import { StreamClient } from "@stream-io/node-sdk";

let streamVideoClient: StreamClient | null = null;

export const getStreamVideoClient = () => {
  if (streamVideoClient) {
    return streamVideoClient;
  }

  const apiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY;
  const secret = process.env.STREAM_VIDEO_SECRET_KEY;

  if (!apiKey || !secret) {
    throw new Error(
      "Missing Stream configuration. Set NEXT_PUBLIC_STREAM_VIDEO_API_KEY and STREAM_VIDEO_SECRET_KEY.",
    );
  }

  streamVideoClient = new StreamClient(apiKey, secret);
  return streamVideoClient;
};
