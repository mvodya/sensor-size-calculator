"use client";
import { useState } from "react";
import { SensorCanvas } from "@/components/sensorCanvas"
import { Parameter, ParameterDual } from "@/components/parameter";

function GDC(a: number, b: number): number {
  if (b) {
    return GDC(b, a % b);
  } else {
    return Math.abs(a);
  }
}

function stringConvertAB(v: { a: number, b: number }): { a: string, b: string } {
  return { a: v.a.toString(), b: v.b.toString() };
}

export default function Home() {
  const [params, setParams] = useState({
    aspectRatio: { a: "0", b: "0" },
    dimensions: { a: "0", b: "0" },
    resolution: { a: "0", b: "0" }, // 8064 x 6048
    megapixels: "0",
    ppi: "0",
    pixelSize: "0",
  });

  function aspectRatioHandler(value: { a: string, b: string }) {
    const gdc = Math.sqrt((1000000 * +params.megapixels) / (+value.a * +value.b))
    const resolution = {
      a: +value.a * gdc,
      b: +value.b * gdc,
    }
    const dimensions = {
      a: +params.pixelSize * resolution.a / 1000,
      b: +params.pixelSize * resolution.b / 1000,
    }

    const diagonalPixels = Math.sqrt((resolution.a * resolution.a) + (resolution.b * resolution.b));
    const diagonalInch = Math.sqrt((+dimensions.a * +dimensions.a) + (+dimensions.b * +dimensions.b)) / 25.4;
    const ppi = diagonalPixels / diagonalInch;

    setParams({ ...params, aspectRatio: value, resolution: stringConvertAB(resolution), dimensions: stringConvertAB(dimensions), ppi: ppi.toString() });
  }

  function dimensionsHandler(value: { a: string, b: string }) {
    const gdc = GDC(+value.a, +value.b);
    const aspectRatio = {
      a: +value.a / gdc,
      b: +value.b / gdc,
    }
    const gdcAR = Math.sqrt((1000000 * +params.megapixels) / (+params.aspectRatio.a * +params.aspectRatio.b))
    const resolution = {
      a: aspectRatio.a * gdcAR,
      b: aspectRatio.b * gdcAR,
    }
    const pixelSize = (+value.a / resolution.a) * 1000;

    const diagonalPixels = Math.sqrt((resolution.a * resolution.a) + (resolution.b * resolution.b));
    const diagonalInch = Math.sqrt((+value.a * +value.a) + (+value.b * +value.b)) / 25.4;
    const ppi = diagonalPixels / diagonalInch;

    setParams({ ...params, dimensions: value, aspectRatio: stringConvertAB(aspectRatio), resolution: stringConvertAB(resolution), pixelSize: pixelSize.toString(), ppi: ppi.toString() });
  }

  function resolutionHandler(value: { a: string, b: string }) {
    const gdc = GDC(+value.a, +value.b);
    const megapixels = +value.a * +value.b / 1000000;
    const aspectRatio = {
      a: +value.a / gdc,
      b: +value.b / gdc,
    }
    const dimensions = {
      a: +params.pixelSize * +value.a / 1000,
      b: +params.pixelSize * +value.b / 1000,
    }
    const diagonalPixels = Math.sqrt((+params.resolution.a * +params.resolution.a) + (+params.resolution.b * +params.resolution.b));
    const diagonalInch = Math.sqrt((dimensions.a * dimensions.a) + (dimensions.b * dimensions.b)) / 25.4;
    const ppi = diagonalPixels / diagonalInch;

    setParams({ ...params, resolution: value, aspectRatio: stringConvertAB(aspectRatio), megapixels: megapixels.toString(), dimensions: stringConvertAB(dimensions), ppi: ppi.toString() });
  }

  function megapixelsHandler(value: string) {
    const gdc = Math.sqrt((1000000 * +value) / (+params.aspectRatio.a * +params.aspectRatio.b))
    const resolution = {
      a: +params.aspectRatio.a * gdc,
      b: +params.aspectRatio.b * gdc,
    }

    setParams({ ...params, megapixels: value, resolution: stringConvertAB(resolution) });
  }

  function ppiHandler(value: string) {
    // setParams({ ...params, ppi: value });
  }

  function pixelSizeHandler(value: string) {
    const dimensions = {
      a: +value * +params.resolution.a / 1000,
      b: +value * +params.resolution.b / 1000,
    }
    const diagonalPixels = Math.sqrt((+params.resolution.a * +params.resolution.a) + (+params.resolution.b * +params.resolution.b));
    const diagonalInch = Math.sqrt((dimensions.a * dimensions.a) + (dimensions.b * dimensions.b)) / 25.4;
    const ppi = diagonalPixels / diagonalInch;

    setParams({ ...params, pixelSize: value, dimensions: stringConvertAB(dimensions), ppi: ppi.toString() });
  }


  return (
    <main>
      <div className="bg-sky-800 text-white">
        <div className="container mx-auto px-4 py-2 text-xl">
          Sensor Size Calculator
        </div>
      </div>
      <div className="container mx-auto px-4 pt-4">
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="grid gap-x-4 gap-y-2 grid-cols-2">
            <ParameterDual id="aspect_ratio" title="Aspect Ratio" value={params.aspectRatio} handler={aspectRatioHandler} delimiter="/" />
            <ParameterDual id="dimensions" title="Dimensions" value={params.dimensions} handler={dimensionsHandler} delimiter="x" unit="mm" />
            <ParameterDual id="resolution" title="Resolution" value={params.resolution} handler={resolutionHandler} delimiter="x" />
            <Parameter id="megapixels" title="Megapixels" value={params.megapixels} handler={megapixelsHandler} unit="MP" />
            <Parameter id="ppi" title="Pixel Per Inch" value={params.ppi} handler={ppiHandler} unit="PPI" />
            <Parameter id="pixel_size" title="Pixel Size" value={params.pixelSize} handler={pixelSizeHandler} unit="μm" />
          </div>
          <div className="grid pt-4">
            <div className="pb-8 font-light">Sensor scheme:</div>
            <div className="flex justify-center">
              <SensorCanvas sizeX={+params.dimensions.a} sizeY={+params.dimensions.b} scale={200} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
