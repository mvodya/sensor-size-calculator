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

export default function Home() {
  const [params, setParams] = useState({
    aspectRatio: { a: 0, b: 0 },
    dimensions: {a: 0, b: 0},
    resolution: { a: 0, b: 0 }, // 8064 x 6048
    megapixels: 0,
    ppi: 0,
    pixelSize: 0,
  });

  function aspectRatioHandler(value: { a: number, b: number }) {
    setParams({ ...params, aspectRatio: value });
  }

  function dimensionsHandler(value: { a: number, b: number }) {
    setParams({ ...params, dimensions: value });
  }

  function resolutionHandler(value: { a: number, b: number }) {
    const gdc = GDC(value.a, value.b);
    const megapixels = value.a * value.b / 1000000;
    const aspectRatio = {
      a: value.a / gdc,
      b: value.b / gdc,
    }
    const dimensions = {
      a: params.pixelSize * value.a / 1000,
      b: params.pixelSize * value.b / 1000,
    }

    setParams({ ...params, resolution: value, aspectRatio: aspectRatio, megapixels: megapixels, dimensions: dimensions });
  }

  function megapixelsHandler(value: number) {
    setParams({ ...params, megapixels: value });
  }

  function ppiHandler(value: number) {
    setParams({ ...params, ppi: value });
  }

  function pixelSizeHandler(value: number) {
    const dimensions = {
      a: value * params.resolution.a / 1000,
      b: value * params.resolution.b / 1000,
    }
    const diagonalPixels = Math.sqrt((params.resolution.a * params.resolution.a) + (params.resolution.b * params.resolution.b));
    const diagonalInch = Math.sqrt((dimensions.a * dimensions.a) + (dimensions.b * dimensions.b)) / 25.4;
    const ppi = diagonalPixels / diagonalInch;

    setParams({ ...params, pixelSize: value, dimensions: dimensions, ppi: ppi });
  }


  return (
    <main className="container mx-auto">
      <div className="grid gap-x-4 gap-y-2 grid-cols-2">
        <ParameterDual id="aspect_ratio" title="Aspect Ratio" value={params.aspectRatio} handler={aspectRatioHandler} delimiter="/" />
        <ParameterDual id="dimensions" title="Dimensions" value={params.dimensions} handler={dimensionsHandler} delimiter="x" unit="mm" />
        <ParameterDual id="resolution" title="Resolution" value={params.resolution} handler={resolutionHandler} delimiter="x" />
        <Parameter id="megapixels" title="Megapixels" value={params.megapixels} handler={megapixelsHandler} unit="MP" />
        <Parameter id="ppi" title="Pixel Per Inch" value={params.ppi} handler={ppiHandler} unit="PPI" />
        <Parameter id="pixel_size" title="Pixel Size" value={params.pixelSize} handler={pixelSizeHandler} unit="μm" />
      </div>
      <SensorCanvas sizeX={params.dimensions.a} sizeY={params.dimensions.b} scale={200} />
    </main>
  )
}
