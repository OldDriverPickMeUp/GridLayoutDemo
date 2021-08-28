import { useCallback, useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
function getNodePoints(node) {
  const { x, y, width, height } = node.getBoundingClientRect();
  const p = node.parentNode.getBoundingClientRect();
  return {
    topLeft: { x: x - p.x, y: y - p.y },
    topRight: { x: x + width - p.x, y: y - p.y },
    bottomLeft: { x: x - p.x, y: y + height - p.y },
    bottomRight: { x: x + width - p.x, y: y + height - p.y },
  };
}

function findNearestAnchorForTopLeft(
  pt,
  spanCount,
  gutter,
  windowSize,
  contentWidth
) {
  const spanWidth =
    ((windowSize.width * contentWidth) / 100 + gutter) / spanCount - gutter;
  const wLoc = Math.round(pt.x / (spanWidth + gutter));
  const hLoc = Math.round(pt.y / (spanWidth + gutter));
  return {
    x: wLoc * (spanWidth + gutter),
    y: hLoc * (spanWidth + gutter),
  };
}

function findNearestAnchorForBottomRight(
  pt,
  spanCount,
  gutter,
  windowSize,
  contentWidth
) {
  const spanWidth =
    ((windowSize.width * contentWidth) / 100 + gutter) / spanCount - gutter;
  const wLoc = Math.round(pt.x / (spanWidth + gutter));
  const hLoc = Math.round(pt.y / (spanWidth + gutter));
  return {
    x: wLoc * (spanWidth + gutter) - gutter,
    y: hLoc * (spanWidth + gutter) - gutter,
  };
}

function DeleteIcon({ color }) {
  return (
    <svg
      t="1630133395104"
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2865"
    >
      <path
        fill={color || "black"}
        d="M256 810.666667c0 46.933333 38.4 85.333333 85.333333 85.333333h341.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V298.666667H256v512zM810.666667 170.666667h-149.333334l-42.666666-42.666667h-213.333334l-42.666666 42.666667H213.333333v85.333333h597.333334V170.666667z"
        p-id="2866"
      ></path>
    </svg>
  );
}

function DRLayoutElement({
  windowSize,
  spanCount,
  gutter,
  contentWidth,
  defaultData,
  elementId,
  deleteById,
  number,
}) {
  const [spanCord, setSpanCord] = useState();
  const spanCordRef = useRef();
  useEffect(() => {
    spanCordRef.current = spanCord;
  }, [spanCord]);
  const rndRef = useRef();
  const nodeRef = useRef();

  const handleDragStop = useCallback(
    (e, data) => {
      const { topLeft } = getNodePoints(data.node);
      rndRef.current.updatePosition(
        findNearestAnchorForTopLeft(
          topLeft,
          spanCount,
          gutter,
          windowSize,
          contentWidth
        )
      );
    },
    [spanCount, gutter, windowSize, contentWidth]
  );

  const handleResizeStop = useCallback(
    (e, dir, refToElement, delta, position) => {
      const spanHeight =
        ((windowSize.width * contentWidth) / 100 + gutter) / spanCount - gutter;
      const { topLeft, bottomRight } = getNodePoints(refToElement);
      const newTopLeft = findNearestAnchorForTopLeft(
        topLeft,
        spanCount,
        gutter,
        windowSize,
        contentWidth
      );
      const newBottomRight = findNearestAnchorForBottomRight(
        bottomRight,
        spanCount,
        gutter,
        windowSize,
        contentWidth
      );
      let height = newBottomRight.y - newTopLeft.y;
      let width = newBottomRight.x - newTopLeft.x;
      if (height < spanHeight) height = spanHeight;
      if (width < spanHeight) width = spanHeight;
      setSpanCord({
        xSpan: Math.round((width + gutter) / (spanHeight + gutter)),
        ySpan: Math.round((height + gutter) / (spanHeight + gutter)),
      });
      rndRef.current.updatePosition(newTopLeft);
      rndRef.current.updateSize({ width, height });
    },
    [spanCount, gutter, windowSize, contentWidth]
  );
  useEffect(() => {
    const refToElement = nodeRef.current.parentNode;
    const spanHeight =
      ((windowSize.width * contentWidth) / 100 + gutter) / spanCount - gutter;
    const { topLeft, bottomRight } = getNodePoints(refToElement);
    const newTopLeft = findNearestAnchorForTopLeft(
      topLeft,
      spanCount,
      gutter,
      windowSize,
      contentWidth
    );
    if (!spanCordRef.current) {
      const newBottomRight = findNearestAnchorForBottomRight(
        bottomRight,
        spanCount,
        gutter,
        windowSize,
        contentWidth
      );
      let height = newBottomRight.y - newTopLeft.y;
      let width = newBottomRight.x - newTopLeft.x;
      if (height < spanHeight) height = spanHeight;
      if (width < spanHeight) width = spanHeight;
      setSpanCord({
        xSpan: Math.round((width + gutter) / (spanHeight + gutter)),
        ySpan: Math.round((height + gutter) / (spanHeight + gutter)),
      });
      rndRef.current.updatePosition(newTopLeft);
      rndRef.current.updateSize({ width, height });
      return;
    }

    const { xSpan, ySpan } = spanCordRef.current;
    let height = ySpan * (spanHeight + gutter) - gutter;
    let width = xSpan * (spanHeight + gutter) - gutter;
    if (height < spanHeight) height = spanHeight;
    if (width < spanHeight) width = spanHeight;
    if (
      height + newTopLeft.y > windowSize.height ||
      width + newTopLeft.x > (windowSize.width * contentWidth) / 100
    ) {
      height = windowSize.height - newTopLeft.y;
      width = (windowSize.width * contentWidth) / 100 - newTopLeft.x;
      setSpanCord({
        xSpan: Math.round((width + gutter) / (spanHeight + gutter)),
        ySpan: Math.round((height + gutter) / (spanHeight + gutter)),
      });
    }
    rndRef.current.updatePosition(newTopLeft);
    rndRef.current.updateSize({ width, height });
  }, [spanCount, gutter, windowSize, contentWidth]);

  const handleDelete = useCallback(
    () => deleteById(elementId),
    [deleteById, elementId]
  );
  return (
    <Rnd
      ref={rndRef}
      default={
        defaultData || {
          x: 0,
          y: 0,
          width: 320,
          height: 200,
        }
      }
      style={{
        backgroundColor: "rgba(122,112,200,0.3)",
        zIndex: elementId,
      }}
      bounds="parent"
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
    >
      <div
        ref={nodeRef}
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.9)",
            fontSize: "2rem",
            fontWeight: "600",
          }}
        >
          {number}
        </div>
        <div
          style={{
            position: "absolute",
            top: 4,
            right: 4,
            width: "1.5rem",
            height: "1.5rem",
            backgroundColor: "rgba(255,255,255,0.6)",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            borderRadius: "4px",
            padding: "4px",
            cursor: "pointer",
          }}
          onClick={handleDelete}
        >
          <DeleteIcon color="#969696" />
        </div>
      </div>
    </Rnd>
  );
}

export default DRLayoutElement;
