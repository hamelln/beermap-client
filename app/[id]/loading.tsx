const Loading = () => {
  return (
    <article style={{ width: "100vw" }}>
      <div>
        <img
          src="/carousel_titles/default_image.webp"
          alt="brewery image"
          fetchPriority="high"
          style={{ width: "100%", aspectRatio: "9/8" }}
        />
      </div>
    </article>
  );
};

export default Loading;
