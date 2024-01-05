export function SelectButton() {
  return (
    <div className="flex w-8 justify-center bg-slate-100">
      <div>S</div>
    </div>
  )
}

const sensorStyle: any = {
  canvans: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
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

export function SensorCanvans() {
  const scale = 200;
  const sizeX = 5000, sizeY = 4000;
  const aspectRatioX = sizeX > sizeY ? (sizeX / sizeY) : 1;
  const aspectRatioY = sizeX < sizeY ? (sizeY / sizeX) : 1;
  const aspectRatio = aspectRatioX > aspectRatioY ? aspectRatioX : aspectRatioY;
  const diagonalAngle = Math.atan(sizeY / sizeX) * 180 / Math.PI;
  const diagonalLength = Math.sqrt(((scale / aspectRatioX) * (scale / aspectRatioX)) + ((scale / aspectRatioY) * (scale / aspectRatioY)));

  sensorStyle.canvans.width = (scale * aspectRatioX) / aspectRatio;
  sensorStyle.canvans.height = (scale * aspectRatioY) / aspectRatio;
  sensorStyle.diagonal.transform = `rotate(${diagonalAngle}deg)`
  sensorStyle.diagonal.width = diagonalLength;

  return (
    <div style={sensorStyle.canvans}>
      <div style={sensorStyle.square}>
        <div style={sensorStyle.diagonal}><div style={sensorStyle.textDiagonal}>100mm</div></div>

      </div>
      <div style={sensorStyle.textSizeX}>100mm</div>
      <div style={sensorStyle.textSizeY}>200mm</div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="container mx-auto">
      <div className="grid gap-x-4 gap-y-2 grid-cols-2">
        <div className="">
          <div className="pb-1">Aspect Ratio:</div>
          <div className="flex">
            <div className="basis-1/4 bg-slate-100 text-center">4</div>
            <div className="basis-1/2 bg-slate-200 text-center">:</div>
            <div className="basis-1/4 bg-slate-300 text-center">3</div>
            <SelectButton />
          </div>
        </div>
        <div className="">
          <div className="pb-1">Diagonal:</div>
          <div className="flex">
            <div className="basis-1/4 bg-slate-100 text-center">1</div>
            <div className="basis-1/2 bg-slate-200 text-center">/</div>
            <div className="basis-1/4 bg-slate-300 text-center">3&quot;</div>
            <SelectButton />
          </div>
        </div>
        <div className="">
          <div className="pb-1">Resolution:</div>
          <div className="flex">
            <div className="basis-1/4 bg-slate-100 text-center">1920</div>
            <div className="basis-1/2 bg-slate-200 text-center">X</div>
            <div className="basis-1/4 bg-slate-300 text-center">1080</div>
            <SelectButton />
          </div>
        </div>
        <div className="">
          <div className="pb-1">Megapixels:</div>
          <div className="flex">
            <div className="basis-1/2 bg-slate-100 text-center">12</div>
            <div className="basis-1/2 bg-slate-300 text-center">MP</div>
            <SelectButton />
          </div>
        </div>
        <div className="">
          <div className="pb-1">Pixel Per Inch:</div>
          <div className="flex">
            <div className="basis-1/2 bg-slate-100 text-center">300</div>
            <div className="basis-1/2 bg-slate-300 text-center">PPI</div>
            <SelectButton />
          </div>
        </div>
        <div className="">
          <div className="pb-1">Pixel Size:</div>
          <div className="flex">
            <div className="basis-1/2 bg-slate-100 text-center">1.55</div>
            <div className="basis-1/2 bg-slate-300 text-center">μm</div>
            <SelectButton />
          </div>
        </div>
      </div>
      <SensorCanvans />
    </main>
  )
}
