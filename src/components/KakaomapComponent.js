import React, { forwardRef, Ref } from "react";

const KakaomapComponent = forwardRef(
  (props, ref) => {
    return (
      <div className="kakao__map">
        <div ref={ref} style={{ width: "100%", height: "100%" }} />
      </div>
    );
  }
);

export default KakaomapComponent;