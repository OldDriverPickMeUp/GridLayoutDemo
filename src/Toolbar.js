import React, { useCallback } from "react";
import Popup from "reactjs-popup";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function ConfigIcon({ color }) {
  return (
    <svg
      t="1630117142256"
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1241"
      //   width="200"
      //   height="200"
    >
      <path
        fill={color || "black"}
        d="M1024 597.333333v-170.666666l-126.833778-14.08a396.145778 396.145778 0 0 0-42.496-102.712889l79.672889-99.555556-120.689778-120.718222-99.555555 79.701333a396.373333 396.373333 0 0 0-102.712889-42.524444L597.333333 0h-170.666666l-14.108445 126.776889a395.776 395.776 0 0 0-102.684444 42.524444L210.289778 89.6 89.543111 210.318222l79.729778 99.555556a397.710222 397.710222 0 0 0-42.496 102.712889L0 426.666667v170.666666l126.776889 14.08a396.714667 396.714667 0 0 0 42.496 102.684445l-79.729778 99.584 120.746667 120.718222 99.584-79.701333a394.723556 394.723556 0 0 0 102.684444 42.496L426.666667 1024h170.666666l14.051556-126.805333a393.159111 393.159111 0 0 0 102.656-42.496l99.612444 79.701333 120.689778-120.718222-79.672889-99.612445a392.192 392.192 0 0 0 42.496-102.656L1024 597.333333z m-512 56.888889a142.250667 142.250667 0 0 1 0-284.444444c78.449778 0 142.222222 63.658667 142.222222 142.222222 0 78.478222-63.772444 142.222222-142.222222 142.222222z"
        p-id="1242"
      ></path>
    </svg>
  );
}

function AddIcon({ color }) {
  return (
    <svg
      t="1630118946750"
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2040"
    >
      <path
        fill={color || "black"}
        d="M942.6 383.8H640.1V81.3c0-44-36-80-80-80h-96.2c-44 0-80 36-80 80v302.5H81.4c-44 0-80 36-80 80V560c0 44 36 80 80 80h302.5v302.5c0 44 36 80 80 80h96.2c44 0 80-36 80-80V640.1h302.5c44 0 80-36 80-80v-96.2c0-44.1-36-80.1-80-80.1z"
        p-id="2041"
      ></path>
    </svg>
  );
}

function EyeIcon({ color, open }) {
  if (open) {
    return (
      <svg
        t="1630133987802"
        className="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3845"
      >
        <path
          fill={color || "black"}
          d="M512 240C178.704 240 12.304 483.872 5.376 494.256a32 32 0 0 0 0 35.504C12.304 540.128 178.704 784 512 784s499.696-243.872 506.624-254.256a32 32 0 0 0 0-35.504C1011.696 483.872 845.296 240 512 240z m0 480C263.888 720 115.744 565.152 72.192 511.936 115.6 458.608 262.976 304 512 304c248.112 0 396.256 154.848 439.808 208.064C908.4 565.392 761.024 720 512 720z"
          p-id="3846"
        ></path>
        <path
          fill={color || "black"}
          d="M512 368c-79.408 0-144 64.608-144 144s64.592 144 144 144 144-64.608 144-144-64.592-144-144-144z m0 224c-44.112 0-80-35.888-80-80s35.888-80 80-80 80 35.888 80 80-35.888 80-80 80z"
          p-id="3847"
        ></path>
      </svg>
    );
  }
  return (
    <svg
      t="1630133932227"
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="3713"
    >
      <path
        fill={color || "black"}
        d="M941.677 391.71c9.338-14.006 6.225-32.681-6.225-43.575-14.006-10.894-32.681-7.781-43.575 6.225-1.557 1.556-174.3 205.426-379.728 205.426-199.2 0-379.727-205.426-381.283-206.982-10.895-12.45-31.125-14.006-43.576-3.113-12.45 10.894-14.006 31.125-3.113 43.576 3.113 4.668 40.463 46.687 99.6 93.375l-79.37 82.482c-12.45 12.45-10.893 32.681 1.557 43.575 3.113 6.225 10.894 9.338 18.676 9.338 7.78 0 15.562-3.113 21.787-9.338l85.594-88.706c40.463 28.013 88.707 54.47 141.62 73.144l-32.682 110.495c-4.668 17.118 4.67 34.237 21.788 38.906h9.337c14.006 0 26.457-9.338 29.569-23.344l32.681-110.495c24.9 4.669 51.357 7.782 77.813 7.782s52.913-3.113 77.814-7.782l32.68 108.939c3.114 14.006 17.12 23.343 29.57 23.343 3.113 0 6.225 0 7.782-1.556 17.118-4.67 26.456-21.787 21.788-38.906L649.099 595.58c52.914-18.676 101.157-45.132 141.62-73.144l84.038 87.15c6.225 6.225 14.006 9.338 21.787 9.338 7.781 0 15.563-3.113 21.787-9.337 12.45-12.451 12.45-31.125 1.557-43.576l-79.37-82.481c63.808-46.689 101.16-91.82 101.16-91.82z"
        p-id="3714"
      ></path>
    </svg>
  );
}

function Toolbar({
  span,
  setSpan,
  gutter,
  setGutter,
  width,
  setWidth,
  showGrid,
  setShowGrid,
  height,
  setHeight,
  onCreate,
  aspectRatio,
  setAspectRatio,
}) {
  const toggleShowGrid = useCallback(() => {
    setShowGrid((e) => !e);
  }, [setShowGrid]);
  return (
    <>
      <Popup
        trigger={
          <div
            style={{
              position: "fixed",
              right: "4px",
              top: "4px",
              width: "3rem",
              height: "3rem",
              cursor: "pointer",
              backgroundColor: "rgba(255,255,255,0.6)",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
              padding: "4px",
              zIndex: 99,
            }}
          >
            <ConfigIcon color="#969696" />
          </div>
        }
        modal
      >
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
            style={{
              display: "flex",
              alignItems: "center",
              margin: "40px 20px",
            }}
          >
            <div
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                width: "100px",
              }}
            >
              Width
            </div>
            <div style={{ width: "180px" }}>
              <Slider
                min={50}
                max={100}
                defaultValue={75}
                value={width}
                onChange={setWidth}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "40px 20px",
            }}
          >
            <div
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                width: "100px",
              }}
            >
              Height
            </div>
            <div style={{ width: "180px" }}>
              <Slider
                min={100}
                max={200}
                defaultValue={150}
                value={height}
                onChange={setHeight}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "40px 20px",
            }}
          >
            <div
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                width: "100px",
              }}
            >
              Gutter
            </div>
            <div style={{ width: "180px" }}>
              <Slider
                min={5}
                max={100}
                defaultValue={12}
                value={gutter}
                onChange={setGutter}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "40px 20px",
            }}
          >
            <div
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                width: "100px",
              }}
            >
              Column Count
            </div>
            <div style={{ width: "180px" }}>
              <Slider
                min={4}
                max={30}
                defaultValue={12}
                value={span}
                onChange={setSpan}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "40px 20px",
            }}
          >
            <div
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                width: "100px",
              }}
            >
              Aspect Ratio
            </div>
            <div style={{ width: "180px" }}>
              <Slider
                min={30}
                max={170}
                defaultValue={100}
                value={aspectRatio}
                onChange={setAspectRatio}
              />
            </div>
          </div>
        </div>
      </Popup>
      <div
        style={{
          position: "fixed",
          right: "4px",
          top: "calc( 3rem + 16px)",
          width: "3rem",
          height: "3rem",
          cursor: "pointer",
          backgroundColor: "rgba(255,255,255,0.6)",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "8px",
          padding: "4px",
          zIndex: 99,
        }}
        onClick={onCreate}
      >
        <AddIcon color="#969696" />
      </div>
      <div
        style={{
          position: "fixed",
          right: "4px",
          top: "calc( 6rem + 28px)",
          width: "3rem",
          height: "3rem",
          cursor: "pointer",
          backgroundColor: "rgba(255,255,255,0.6)",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "8px",
          padding: "4px",
          zIndex: 99,
        }}
        onClick={toggleShowGrid}
      >
        <EyeIcon color="#969696" open={showGrid} />
      </div>
    </>
  );
}

export default Toolbar;
