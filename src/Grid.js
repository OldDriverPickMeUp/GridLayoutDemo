import React, { useMemo } from "react";

function Grid({
  gutter,
  spanCount,
  windowSize,
  contentWidth,
  contentHeight,
  aspectRatio,
}) {
  return useMemo(() => {
    const ratio = aspectRatio / 100;
    const toRenderHor = [];
    for (let i = 0; i < spanCount - 1; ++i) {
      toRenderHor.push(1);
      toRenderHor.push(2);
    }
    toRenderHor.push(1);
    const spanHeight =
      (((windowSize.width * contentWidth) / 100 + gutter) / spanCount -
        gutter) *
      ratio;
    const verticalSpanCount = Math.ceil(
      ((windowSize.height * contentHeight) / 100 + gutter) /
        (spanHeight + gutter)
    );
    const toRenderVert = [];
    for (let i = 0; i < verticalSpanCount - 1; ++i) {
      toRenderVert.push(1);
      toRenderVert.push(2);
    }
    toRenderVert.push(1);
    return (
      <div
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <div
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div style={{ height: "100%", width: "100%", display: "flex" }}>
            {toRenderHor.map((each, i) => {
              if (each === 1) {
                return (
                  <div
                    key={i}
                    style={{
                      flex: "1",
                      height: "100%",
                    }}
                  ></div>
                );
              }
              return (
                <div
                  key={i}
                  style={{
                    width: `${gutter}px`,
                    height: "100%",
                    background: "lightgrey",
                    opacity: 0.3,
                  }}
                ></div>
              );
            })}
          </div>
        </div>
        <div style={{ height: "100%", width: "100%", overflow: "hidden" }}>
          {toRenderVert.map((each, i) => {
            if (each === 1) {
              return (
                <div
                  key={i}
                  style={{
                    height: `${spanHeight}px`,
                  }}
                ></div>
              );
            }
            return (
              <div
                key={i}
                style={{
                  height: `${gutter}px`,
                  background: "lightgrey",
                  opacity: 0.3,
                }}
              ></div>
            );
          })}
        </div>
      </div>
    );
  }, [gutter, spanCount, windowSize, contentWidth, contentHeight, aspectRatio]);
}

export default Grid;
