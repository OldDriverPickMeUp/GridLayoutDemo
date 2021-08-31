import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import faker from "faker";
import { Rnd } from "react-rnd";
import Popup from "reactjs-popup";

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
  contentWidth,
  aspectRatio
) {
  const spanWidth =
    ((windowSize.width * contentWidth) / 100 + gutter) / spanCount - gutter;
  const spanHeight = (spanWidth * aspectRatio) / 100;

  const wLoc = Math.round(pt.x / (spanWidth + gutter));

  const hLoc = Math.round(pt.y / (spanHeight + gutter));
  return {
    x: wLoc * (spanWidth + gutter),
    y: hLoc * (spanHeight + gutter),
  };
}

function findNearestAnchorForBottomRight(
  pt,
  spanCount,
  gutter,
  windowSize,
  contentWidth,
  aspectRatio
) {
  const spanWidth =
    ((windowSize.width * contentWidth) / 100 + gutter) / spanCount - gutter;
  const spanHeight = (spanWidth * aspectRatio) / 100;

  const wLoc = Math.round(pt.x / (spanWidth + gutter));
  const hLoc = Math.round(pt.y / (spanHeight + gutter));
  return {
    x: wLoc * (spanWidth + gutter) - gutter,
    y: hLoc * (spanHeight + gutter) - gutter,
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

function EditIcon({ color }) {
  return (
    <svg
      t="1630331632367"
      className="icon"
      viewBox="0 0 1152 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2885"
    >
      <path
        fill={color || "black"}
        d="M805.2 166.4l180.4 180.4c7.6 7.6 7.6 20 0 27.6L548.8 811.2l-185.6 20.6c-24.8 2.8-45.8-18.2-43-43l20.6-185.6L777.6 166.4c7.6-7.6 20-7.6 27.6 0z m324-45.8l-97.6-97.6c-30.4-30.4-79.8-30.4-110.4 0l-70.8 70.8c-7.6 7.6-7.6 20 0 27.6l180.4 180.4c7.6 7.6 20 7.6 27.6 0l70.8-70.8c30.4-30.6 30.4-80 0-110.4zM768 692.4V896H128V256h459.6c6.4 0 12.4-2.6 17-7l80-80c15.2-15.2 4.4-41-17-41H96C43 128 0 171 0 224v704c0 53 43 96 96 96h704c53 0 96-43 96-96V612.4c0-21.4-25.8-32-41-17l-80 80c-4.4 4.6-7 10.6-7 17z"
        p-id="2886"
      ></path>
    </svg>
  );
}

const EditButton = React.forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      onTouchEndCapture={() => {
        ref.current && ref.current.click();
      }}
      tabIndex="1"
      style={{
        position: "absolute",
        top: "calc(4px + 8px + 4px + 1.5rem)",
        right: 4,
        width: "1.5rem",
        height: "1.5rem",
        backgroundColor: "rgba(255,255,255,0.9)",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        borderRadius: "4px",
        padding: "4px",
        cursor: "pointer",
        zIndex: 19,
      }}
    >
      <EditIcon color="#969696" />
    </div>
  );
});

function DRLayoutElement({
  windowSize,
  spanCount,
  gutter,
  contentWidth,
  contentHeight,
  defaultData,
  elementId,
  deleteById,
  number,
  showToolBar,
  aspectRatio,
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
          contentWidth,
          aspectRatio
        )
      );
    },
    [spanCount, gutter, windowSize, contentWidth, aspectRatio]
  );

  const handleResizeStop = useCallback(
    (e, dir, refToElement, delta, position) => {
      const spanWidth =
        ((windowSize.width * contentWidth) / 100 + gutter) / spanCount - gutter;
      const spanHeight = (spanWidth * aspectRatio) / 100;
      const { topLeft, bottomRight } = getNodePoints(refToElement);
      const newTopLeft = findNearestAnchorForTopLeft(
        topLeft,
        spanCount,
        gutter,
        windowSize,
        contentWidth,
        aspectRatio
      );
      const newBottomRight = findNearestAnchorForBottomRight(
        bottomRight,
        spanCount,
        gutter,
        windowSize,
        contentWidth,
        aspectRatio
      );
      let height = newBottomRight.y - newTopLeft.y;
      let width = newBottomRight.x - newTopLeft.x;
      if (height < spanHeight) height = spanHeight;
      if (width < spanWidth) width = spanWidth;
      setSpanCord({
        xSpan: Math.round((width + gutter) / (spanWidth + gutter)),
        ySpan: Math.round((height + gutter) / (spanHeight + gutter)),
      });
      rndRef.current.updatePosition(newTopLeft);
      rndRef.current.updateSize({ width, height });
    },
    [spanCount, gutter, windowSize, contentWidth, aspectRatio]
  );
  useEffect(() => {
    const refToElement = nodeRef.current.parentNode;
    const spanWidth =
      ((windowSize.width * contentWidth) / 100 + gutter) / spanCount - gutter;
    const spanHeight = (spanWidth * aspectRatio) / 100;
    const { topLeft, bottomRight } = getNodePoints(refToElement);
    const newTopLeft = findNearestAnchorForTopLeft(
      topLeft,
      spanCount,
      gutter,
      windowSize,
      contentWidth,
      aspectRatio
    );
    if (!spanCordRef.current) {
      const newBottomRight = findNearestAnchorForBottomRight(
        bottomRight,
        spanCount,
        gutter,
        windowSize,
        contentWidth,
        aspectRatio
      );
      let height = newBottomRight.y - newTopLeft.y;
      let width = newBottomRight.x - newTopLeft.x;
      if (height < spanHeight) height = spanHeight;
      if (width < spanWidth) width = spanWidth;
      setSpanCord({
        xSpan: Math.round((width + gutter) / (spanWidth + gutter)),
        ySpan: Math.round((height + gutter) / (spanHeight + gutter)),
      });
      rndRef.current.updatePosition(newTopLeft);
      rndRef.current.updateSize({ width, height });
      return;
    }

    const { xSpan, ySpan } = spanCordRef.current;
    let height = ySpan * (spanHeight + gutter) - gutter;
    let width = xSpan * (spanWidth + gutter) - gutter;
    if (height < spanWidth) height = spanHeight;
    if (width < spanWidth) width = spanWidth;
    if (
      height + newTopLeft.y > (windowSize.height * contentHeight) / 100 ||
      width + newTopLeft.x > (windowSize.width * contentWidth) / 100
    ) {
      height = (windowSize.height * contentHeight) / 100 - newTopLeft.y;
      width = (windowSize.width * contentWidth) / 100 - newTopLeft.x;
      setSpanCord({
        xSpan: Math.round((width + gutter) / (spanWidth + gutter)),
        ySpan: Math.round((height + gutter) / (spanHeight + gutter)),
      });
    }
    rndRef.current.updatePosition(newTopLeft);
    rndRef.current.updateSize({ width, height });
  }, [spanCount, gutter, windowSize, contentWidth, contentHeight, aspectRatio]);

  const handleDelete = useCallback(
    () => deleteById(elementId),
    [deleteById, elementId]
  );
  const [contentType, setContent] = useState();
  const fakeContent = useMemo(() => {
    if (contentType === "article") {
      return (
        <div
          style={{
            height: "100%",
            width: "100%",
            overflow: "hidden",
            lineHeight: "150%",
            fontSize: "1.5rem",
            color: "#969696",
            userSelect: "none",
          }}
        >
          {faker.lorem.paragraph(200)}
        </div>
      );
    }
    if (contentType === "image") {
      const { width, height } = nodeRef.current.getBoundingClientRect();
      return (
        <div style={{ height: "100%", width: "100%" }}>
          <img
            src={faker.image.imageUrl(
              Math.ceil(width / 100) * 100,
              Math.ceil(height / 100) * 100,
              undefined,
              true
            )}
            alt=""
            height="100%"
            width="100%"
            style={{ userSelect: "none" }}
            draggable={false}
          />
        </div>
      );
    }
    if (contentType === "title") {
      return (
        <div
          style={{
            height: "100%",
            width: "100%",
            overflow: "hidden",
            lineHeight: "150%",
            fontSize: "2.25rem",
            color: "#969696",
            display: "flex",
            alignItems: "center",
            userSelect: "none",
          }}
        >
          <div>{faker.lorem.sentence()}</div>
        </div>
      );
    }
    return null;
  }, [contentType]);
  const bg = contentType ? "rgba(122,112,200,0.2)" : "rgba(122,112,200,0.3)";
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
        backgroundColor: showToolBar && bg,
        zIndex: elementId,
      }}
      bounds="parent"
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      allowAnyClick={true}
      disableDragging={!showToolBar}
      enableResizing={!showToolBar}
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
        {fakeContent ? (
          fakeContent
        ) : (
          <div
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "2rem",
              fontWeight: "600",
            }}
          >
            {number}
          </div>
        )}

        {showToolBar && (
          <div
            style={{
              position: "absolute",
              top: 4,
              right: 4,
              width: "1.5rem",
              height: "1.5rem",
              backgroundColor: "rgba(255,255,255,0.9)",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              borderRadius: "4px",
              padding: "4px",
              cursor: "pointer",
              zIndex: 19,
            }}
            onClick={handleDelete}
            onTouchEnd={handleDelete}
          >
            <DeleteIcon color="#969696" />
          </div>
        )}
        {showToolBar && (
          <Popup trigger={<EditButton />}>
            <div
              style={{
                color: "#969696",
                padding: "12px",
                backgroundColor: "rgba(255,255,255,0.9)",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setContent("article")}
              >
                article
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setContent("image")}
              >
                image
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setContent("title")}
              >
                title
              </div>
              <div style={{ cursor: "pointer" }} onClick={() => setContent()}>
                clear
              </div>
            </div>
          </Popup>
        )}
      </div>
    </Rnd>
  );
}

export default DRLayoutElement;
