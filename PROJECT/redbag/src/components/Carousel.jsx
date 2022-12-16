import { useEffect, useState } from "react";
import ClippedImg from "../components/Image/ClippedImage";

export default function Carousel({ images }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev < 1 ? prev + 1 : 0));
    }, 8000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="mx-auto mb-8 bg-white shadow-md p-4 rounded-lg relative">
      {images.map((image, index) => (
        <div
          key={index}
          style={{ transition: "opacity 0.5s" }}
          className={
            active === index ? "opacity-1" : "h-0 overflow-hidden opacity-0"
          }
        >
          <ClippedImg src={image} width="100%" height="28rem" />
        </div>
      ))}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex justify-center gap-2 m-2">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setActive(index)}
            className={`bg-${
              active === index ? "white" : "primary"
            } w-4 h-4 rounded-full cursor-pointer border-2 border-primary`}
          ></span>
        ))}
      </div>
    </div>
  );
}
