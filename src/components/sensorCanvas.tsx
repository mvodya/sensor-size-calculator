import { recursiveAssign } from "@/utils/recursiveAssign";

interface SensorCanvasProps {
  sizeX: number;
  sizeY: number;
  scale: number;
}

const sensorCanvasStyle: any = {
  canvas: {
    position: "relative",
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%,-50%)",
  },
  square: {
    width: "100%",
    height: "100%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    background: "#f0f0f0",
    position: "absolute",
    border: "3px solid",
    overflow: "hidden",
  },
  textSizeX: {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%,-100%)",
  },
  textSizeY: {
    position: "absolute",
    transformOrigin: "top left",
    top: "50%",
    transform: "rotate(-90deg) translate(-50%,-100%)",
  },
  textSquare: {
    position: "absolute",
    bottom: "0px",
  },
  diagonal: {
    width: "calc(100px * sqrt(2))",
    borderTop: "3px solid",
    position: "absolute",
    top: "-5px",
    left: "-3px",
    transformOrigin: "top left",
  },
  textDiagonal: {
    position: "absolute",
    transformOrigin: "top left",
    left: "50%",
    transform: "translate(-50%, 0)",
  }
}

export function SensorCanvas(props: SensorCanvasProps) {
  let style = recursiveAssign({}, sensorCanvasStyle);

  const scale = props.scale ?? 200;
  const sizeX = props.sizeX, sizeY = props.sizeY;

  const aspectRatioX = sizeX > sizeY ? (sizeX / sizeY) : 1;
  const aspectRatioY = sizeX < sizeY ? (sizeY / sizeX) : 1;
  const aspectRatio = aspectRatioX > aspectRatioY ? aspectRatioX : aspectRatioY;

  const diagonalAngle = Math.atan(sizeY / sizeX) * 180 / Math.PI;
  const diagonalLength = Math.sqrt(((scale / aspectRatioX) * (scale / aspectRatioX)) + ((scale / aspectRatioY) * (scale / aspectRatioY)));

  style.canvas.width = (scale * aspectRatioX) / aspectRatio;
  style.canvas.height = (scale * aspectRatioY) / aspectRatio;
  style.diagonal.transform = `rotate(${diagonalAngle}deg)`
  style.diagonal.width = diagonalLength;

  const square = (sizeX * sizeY / 100);
  const diagonal = Math.sqrt((sizeX * sizeX) + (sizeY * sizeY));

  return (
    <div className="transition-all duration-300" style={style.canvas}>
      <div className="transition-all duration-300" style={style.square}>
        <div className="transition-all duration-300" style={style.diagonal}>
          <div className="transition-all duration-300" style={style.textDiagonal}>{isFinite(diagonal) ? diagonal.toFixed(2) + "mm" : "🤬"}</div>
        </div>
        <div className="transition-all duration-300" style={style.textSquare}>S = {isFinite(square) ? square.toFixed(2) : "😫"}cm²</div>
      </div>
      <div className="transition-all duration-300" style={style.textSizeX}>{isFinite(sizeX) ? sizeX.toFixed(2) + "mm" : "😵"}</div>
      <div className="transition-all duration-300" style={style.textSizeY}>{isFinite(sizeY) ? sizeY.toFixed(2) + "mm" : "😵"}</div>
    </div>
  )
}