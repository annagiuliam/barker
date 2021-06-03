import { useState, useEffect, useContext } from "react";
import { BarkerContext } from "../context/BarkerContext";
import { storage } from "../firebase/firebase";

const useStorage = (file) => {
  const { handleError } = useContext(BarkerContext);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    //references
    if (file) {
      const storageRef = storage.ref(file.name);
      storageRef.put(file).on(
        "state_changed",
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(percentage);
        },
        (error) => {
          setError(error);
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          setImageUrl(url);
        }
      );
    }
  }, [file]);
  return { progress, imageUrl, error };
};

export default useStorage;
