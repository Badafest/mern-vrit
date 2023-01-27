export default function ClippedImg({ src, alt, width, height, ratio, radius }) {
  return (
    <img
      style={{
        width: `${width}`,
        height: `${height || "auto"}`,
        aspectRatio: `${ratio || "auto"}`,
        borderRadius: `${radius}`,
        WebkitBorderRadius: `${radius}`,
        overflow: "hidden",
        objectFit: "cover",
      }}
      src={src}
      alt={alt}
    />
  );
}
