import React, { useEffect } from "react";
import useStorage from "../../hooks/useStorage";

const ProgressBar = ({ file, setFile }) => {
  const { imageUrl, progress } = useStorage(file);

  useEffect(() => {
    if (imageUrl) {
      setFile(null);
    }
  }, [imageUrl, setFile]);

  return <div className="progress-bar" style={{ width: progress + "%" }}></div>;
};

export default ProgressBar;
