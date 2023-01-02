export default function ClippedImg({ src, alt, width, height, radius }) {
  return (
    <img
      style={{
        width: `${width}`,
        height: `${height || width}`,
        borderRadius: `${radius}`,
        WebkitBorderRadius: `${radius}`,
        overflow: "hidden",
        objectFit: "cover",
        flexGrow: 1,
      }}
      src={src}
      alt={alt}
    />
  );
}
