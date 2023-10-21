import { useEffect, useState } from "react";

export const useMedia = (opt) => {
  const [Type, setType] = useState("");

  const getClientWid = () => {
    let wid = window.innerWidth;
    if (wid >= 1400) setType("");
    if (wid >= 1000 && wid < 1400) setType("laptop");
    if (wid >= 640 && wid < 1000) setType("tablet");
    if (wid >= 0 && wid < 640) setType("mobile");
  };

  useEffect(() => {
    getClientWid();
    window.addEventListener("resize", getClientWid);
    return () => window.removeEventListener("resize", getClientWid);
  }, []);

  return Type;
};
