import { useCallback, useState } from "react";
import "./App.css";
import DRLayoutElement from "./Element";
import Grid from "./Grid";
import useWindowSize from "./resizeWindow";
import Toolbar from "./Toolbar";

let ID_COUNT = 0;
function getNextId() {
  const ret = ID_COUNT;
  ID_COUNT += 1;
  return ret;
}

// function getDefaultData(windowSize, spanCount, contentWidth, gutter) {}

function App() {
  const [gutter, setGutter] = useState(12);
  const [spanCount, setSpanCount] = useState(24);
  const windowSize = useWindowSize();
  const [contentWidth, setContentWidth] = useState(75);
  const [elements, setElements] = useState([]);
  const [showGrid, setShowGrid] = useState(true);

  const handleCreate = useCallback(() => {
    setElements((elements) => [...elements, getNextId()]);
  }, []);
  const handleDeleteById = useCallback((elementId) => {
    setElements((elements) => elements.filter((e) => e !== elementId));
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: showGrid && "rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          width: `${contentWidth}vw`,
          height: "100vh",
          position: "relative",
          backgroundColor: "white",
        }}
      >
        {showGrid && (
          <Grid
            spanCount={spanCount}
            gutter={gutter}
            windowSize={windowSize}
            contentWidth={contentWidth}
          />
        )}
        <Toolbar
          width={contentWidth}
          setWidth={setContentWidth}
          gutter={gutter}
          setGutter={setGutter}
          span={spanCount}
          setSpan={setSpanCount}
          onCreate={handleCreate}
          showGrid={showGrid}
          setShowGrid={setShowGrid}
        />
        {elements.map((e, i) => (
          <DRLayoutElement
            elementId={e}
            key={e}
            number={i + 1}
            contentWidth={contentWidth}
            spanCount={spanCount}
            gutter={gutter}
            windowSize={windowSize}
            deleteById={handleDeleteById}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
