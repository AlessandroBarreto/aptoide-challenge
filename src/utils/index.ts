const getErrorMsg = (file: File): String => {
  if (file.type !== "image/png") {
    return "File must be in PNG format";
  }

  if (file.size > 5 * 1000000) {
    return "File size must be less than 5MBs";
  }

  //   const ratio = getImageRatio(file);
  //   console.log("ratio", ratio);
  //   if (ratio > 2 || ratio < 0.5) {
  //     return "Image ratio must not exceed 2";
  //   }

  return "";
};

const getImageRatio = (file: File): number => {
  let img = new Image();
  let ratio = 0;
  img.src = window.URL.createObjectURL(file);
  img.onload = () => {
    ratio = img.height / img.width;
    console.log(ratio);
  };

  return ratio;
};

const getBucketUrl = (keyName: string) =>
  `https://aptoide-challenge.s3.eu-west-3.amazonaws.com/${keyName}`;

export { getErrorMsg, getBucketUrl };
