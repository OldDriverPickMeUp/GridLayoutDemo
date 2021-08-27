import { useCallback, useRef } from "react";
import { Rnd } from "react-rnd";
import "./App.css";
import Grid from "./Grid";
import useWindowSize from "./resizeWindow";

function getNodePoints(node) {
  const { x, y, width, height } = node.getBoundingClientRect();
  return {
    topLeft: { x, y },
    topRight: { x: x + width, y },
    bottomLeft: { x, y: y + height },
    bottomRight: { x: x + width, y: y + height },
  };
}

function findNearestAnchor(pt, spanCount, gutter, windowSize) {
  const spanWidth = (windowSize.width + gutter) / spanCount - gutter;
  const wLoc = Math.round(pt.x / (spanWidth + gutter));
  const hLoc = Math.round(pt.y / (spanWidth + gutter));
  return { x: wLoc * (spanWidth + gutter), y: hLoc * (spanWidth + gutter) };
}

function App() {
  const spanCount = 24;
  const gutter = 12;
  const windowSize = useWindowSize();
  const rndRef = useRef();
  const handleDragStop = useCallback(
    (e, data) => {
      const { topLeft } = getNodePoints(data.node);
      rndRef.current.updatePosition(
        findNearestAnchor(topLeft, spanCount, gutter, windowSize)
      );
    },
    [spanCount, gutter, windowSize]
  );

  const handleResizeStop = useCallback(
    (e, dir, refToElement, delta, position) => {
      console.log(dir, delta, position);
    },
    []
  );
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Grid spanCount={spanCount} gutter={gutter} windowSize={windowSize} />
      <Rnd
        ref={rndRef}
        default={{
          x: 0,
          y: 0,
          width: 320,
          height: 200,
        }}
        style={{
          backgroundColor: "rgba(122,112,200,0.3)",
        }}
        bounds="parent"
        onDragStop={handleDragStop}
        onResizeStop={handleResizeStop}
      >
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            display: "flex",
          }}
        >
          <div>Rnd</div>
        </div>
      </Rnd>
    </div>
  );
}

export default App;
