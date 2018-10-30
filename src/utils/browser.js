export const hasGetUserMedia = () => {
  const {
    mediaDevices,
    webkitGetUserMedia,
    mozGetUserMedia,
    msGetUserMedia,
  } = navigator;
  return !!(
    (mediaDevices && mediaDevices.getUserMedia) ||
    webkitGetUserMedia ||
    mozGetUserMedia ||
    msGetUserMedia
  );
};
