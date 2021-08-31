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

function getDefaultData(
  windowSize,
  spanCount,
  contentWidth,
  gutter,
  aspectRatio
) {
  const spanWidth =
    ((windowSize.width * contentWidth) / 100 + gutter) / spanCount - gutter;
  const spanHeight = (spanWidth * aspectRatio) / 100;
  const spanX = Math.ceil(spanCount / 3);
  const spanY = Math.ceil(windowSize.height / spanHeight / 3);
  const wLoc = Math.floor((spanCount - spanX) / 2);
  const hLoc = Math.floor(
    (windowSize.height / spanHeight - spanY) / 2 + window.scrollY / spanHeight
  );
  return {
    x: wLoc * (spanWidth + gutter) - gutter,
    y: hLoc * (spanHeight + gutter) - gutter,
    width: spanX * (spanWidth + gutter) - gutter,
    height: spanY * (spanHeight + gutter) - gutter,
  };
}

function App() {
  const [gutter, setGutter] = useState(12);
  const [spanCount, setSpanCount] = useState(12);
  const windowSize = useWindowSize();
  const [contentWidth, setContentWidth] = useState(75);
  const [contentHeight, setContentHeight] = useState(150);
  const [aspectRatio, setAspectRatio] = useState(100);

  const [elements, setElements] = useState([]);
  const [showGrid, setShowGrid] = useState(true);

  const handleCreate = useCallback(() => {
    const defaultData = getDefaultData(
      windowSize,
      spanCount,
      contentWidth,
      gutter,
      aspectRatio
    );
    setElements((elements) => [...elements, { key: getNextId(), defaultData }]);
  }, [windowSize, spanCount, contentWidth, gutter, aspectRatio]);
  const handleDeleteById = useCallback((elementId) => {
    setElements((elements) => elements.filter(({ key }) => key !== elementId));
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
          width: `${contentWidth}%`,
          height: `${contentHeight}vh`,
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
            contentHeight={contentHeight}
            aspectRatio={aspectRatio}
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
          height={contentHeight}
          setHeight={setContentHeight}
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
        />
        {elements.map(({ key, defaultData }, i) => (
          <DRLayoutElement
            showToolBar={showGrid}
            elementId={key}
            key={key}
            defaultData={defaultData}
            number={i + 1}
            contentWidth={contentWidth}
            contentHeight={contentHeight}
            spanCount={spanCount}
            gutter={gutter}
            windowSize={windowSize}
            deleteById={handleDeleteById}
            aspectRatio={aspectRatio}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
