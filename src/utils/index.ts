export type KeyType = string | undefined;

const getErrorMsg = async (file: File): Promise<string> => {
  if (file.type !== "image/png") {
    return "File must be in PNG format";
  }

  if (file.size > 5 * 1000000) {
    return "File size must be less than 5MBs";
  }

  const imageUrl = URL.createObjectURL(file);
  const ratio: any = await getImageRatio(imageUrl);
  if (ratio > 2 || ratio < 0.5) {
    return "Image ratio must not exceed 2";
  }

  return "";
};

const getImageRatio = (url: string) => {
  const img = document.createElement("img");

  const promise = new Promise((resolve, reject) => {
    img.onload = () => {
      // Natural size is the actual image size regardless of rendering.
      // The 'normal' `width`/`height` are for the **rendered** size.
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      // Resolve promise with the width and height
      resolve(width / height);
    };

    // Reject promise on error
    img.onerror = reject;
  });

  // Setting the source makes it start downloading and eventually call `onload`
  img.src = url;

  return promise;
};

const getBucketUrl = (keyName: KeyType) =>
  `https://${process.env.REACT_APP_AWS_BUCKET_NAME}.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/${keyName}`;

export { getErrorMsg, getBucketUrl };
