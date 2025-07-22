const SkeletonLoader = () => {
  const uniqueId = Math.random().toString(36).substr(2, 9); 

  return (
    <svg
      role="img"
      aria-labelledby={`loading-aria-${uniqueId}`}
      viewBox="0 0 340 84"
      preserveAspectRatio="none"
      className="w-full h-full"
    >
      <title id={`loading-aria-${uniqueId}`}>Loading...</title>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        clipPath={`url(#clip-path-${uniqueId})`}
        style={{ fill: `url(#fill-${uniqueId})` }}
      />
      <defs>
        <clipPath id={`clip-path-${uniqueId}`}>
          <rect
            x="0"
            y="0"
            rx="6"
            ry="6"
            width="100%"
            height="100%"
          />
        </clipPath>
        <linearGradient id={`fill-${uniqueId}`}>
          <stop offset="0.599964" stopColor="#f3f3f3" stopOpacity="1">
            <animate
              attributeName="offset"
              values="-2; -2; 1"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="1.59996" stopColor="#ecebeb" stopOpacity="1">
            <animate
              attributeName="offset"
              values="-1; -1; 2"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="2.59996" stopColor="#f3f3f3" stopOpacity="1">
            <animate
              attributeName="offset"
              values="0; 0; 3"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SkeletonLoader;
