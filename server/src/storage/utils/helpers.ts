type UploadProgressOptions = {
  fileName: string;
  totalBytes?: number; // optional (may not exist)
  logEveryBytes?: number; // throttle (default 100KB)
};

export const createUploadProgressTracker = ({
  fileName,
  totalBytes = 0,
  logEveryBytes = 100 * 1024,
}: UploadProgressOptions) => {
  let receivedBytes = 0;
  let lastLogged = 0;

  return {
    onChunk(chunk: Buffer) {
      receivedBytes += chunk.length;

      if (receivedBytes - lastLogged >= logEveryBytes) {
        lastLogged = receivedBytes;

        if (totalBytes > 0) {
          const percent = ((receivedBytes / totalBytes) * 100).toFixed(2);
          console.log(
            `[upload] ${fileName} → ${percent}% (${receivedBytes}/${totalBytes})`,
          );
        } else {
          console.log(`[upload] ${fileName} → ${receivedBytes} bytes received`);
        }
      }
    },

    onComplete() {
      console.log(`[upload] ${fileName} → completed (${receivedBytes} bytes)`);
    },

    getBytes() {
      return receivedBytes;
    },
  };
};
