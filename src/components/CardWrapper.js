const CardWrapper = ({ children }) => {
  return (
    <div className="relative    w-[90vw] h-[70vh]">
      <svg className="absolute w-0 h-0">
        <defs>
          <clipPath id="custom-clip" clipPathUnits="objectBoundingBox">
            <path
              d="
                M0.1184,0.0069H0.0541C0.0004,-0.0062,0.0037,0.0849,0.0037,0.0907 C0.0037,0.0965,0,0.4139,0,0.486C0,0.5581,0.0029,0.577,0.0044,0.6023
                C0.0058,0.627,0.0022,0.712,0.0022,0.8607
                C0.0022,1.0094,0.021,0.9873,0.032,0.9952
                C0.041,1.0017,0.5131,0.9986,0.7484,0.9952
                C0.8191,1.0002,0.9641,1.0052,0.9819,0.9853
                C1.0058,0.9606,0.9943,0.761,0.9978,0.692
                C1.0013,0.623,0.9973,0.3998,0.9943,0.3794
                C0.9913,0.359,0.9943,0.1324,0.9943,0.0663
                C0.9943,0.0012,0.9705,0.0013,0.9643,0.0014
                L0.9641,0.0014
                C0.9598,0.0014,0.8231,0.0069,0.8163,0.0069
                H0.5323H0.2508H0.1184Z
              "
              fill="black"
            />
          </clipPath>
        </defs>
      </svg>

      <div
        className="w-full h-full"
        style={{
          clipPath: "url(#custom-clip)",
          WebkitClipPath: "url(#custom-clip)",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CardWrapper;
