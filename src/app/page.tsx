"use client";
import { useState } from "react";
import { SensorCanvas } from "@/components/sensorCanvas"
import { Parameter, ParameterDual } from "@/components/parameter";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRulerCombined, faCropSimple, faCamera, faRuler, faImage, faCompassDrafting, faObjectGroup } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// Calculate greatest common divisor
function GDC(a: number, b: number): number {
  if (b) {
    return GDC(b, a % b);
  } else {
    return Math.abs(a);
  }
}

// Convert {number, number} to {string, string}
function stringConvertAB(v: { a: number, b: number }): { a: string, b: string } {
  return { a: v.a.toString(), b: v.b.toString() };
}

export default function Home() {
  const [params, setParams] = useState({
    aspectRatio: { a: "4", b: "3" },
    dimensions: { a: "9.83", b: "7.37" },
    resolution: { a: "8064", b: "6048" }, // 8064 x 6048
    megapixels: "48.771072",
    ppi: "20819.67",
    pixelSize: "1.22",
  });

  // Aspect ratio calculator
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

  // Dimensions calculator
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

  // Resolution calculator
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
    // Not used (constant only)
    // setParams({ ...params, ppi: value });
  }

  // Pixel size calculator
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

  // Predefined Aspect ratios for select box
  const predefinedAspectRatioList = [
    { title: "16:9", value: { a: "16", b: "9" } },
    { title: "16:10", value: { a: "16", b: "10" } },
    { title: "4:3", value: { a: "4", b: "3" } },
    { title: "1:1", value: { a: "1", b: "1" } },
    { title: "1.33:1", value: { a: "1.33", b: "1" } },
    { title: "14:10", value: { a: "14", b: "10" } },
    { title: "1.85:1", value: { a: "1.85", b: "1" } },
    { title: "2.00:1", value: { a: "2.00", b: "1" } },
    { title: "2.40:1", value: { a: "2.40", b: "1" } },
  ];

  // Predefined Resolutions (with names) for select box
  const predefinedResolutionList = [
    { title: "1920 x 1080 (Full HD)", value: { a: "1920", b: "1080" } },
    { title: "1280 x 720 (HD)", value: { a: "1280", b: "1024" } },
    { title: "854 x 480 (SD)", value: { a: "854", b: "480" } },
    { title: "640 x 360 (360p)", value: { a: "640", b: "360" } },
    { title: "426 x 240 (240p)", value: { a: "426", b: "240" } },
    { title: "2560 x 1440 (QHD)", value: { a: "2560", b: "1440" } },
    { title: "3840 x 2160 (4K UHD)", value: { a: "3840", b: "2160" } },
    { title: "7680 x 4320 (8K)", value: { a: "7680", b: "4320" } },
    { title: "1366 x 768", value: { a: "1366", b: "768" } },
    { title: "1280 x 1024", value: { a: "1280", b: "1024" } },
    { title: "1440 x 900", value: { a: "1440", b: "900" } },
    { title: "1600 x 900", value: { a: "1600", b: "900" } },
    { title: "1680 x 1050", value: { a: "1680", b: "1050" } },
    { title: "1280 x 800", value: { a: "1280", b: "800" } },
    { title: "1024 x 768", value: { a: "1024", b: "768" } },
  ];

  return (
    <main>
      <div className="bg-sky-800 text-white">
        <div className="container mx-auto px-4 py-2 text-xl flex justify-between">
          <div>
            Sensor Size Calculator</div>
          <div>
            <a target="_blank" href="https://github.com/mvodya/sensor-size-calculator" rel="noopener noreferrer" className="hover:text-blue-400">
              <FontAwesomeIcon
                icon={faGithub}
                className="fas"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 pt-4">
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="grid gap-x-4 gap-y-2 grid-cols-2">
            <ParameterDual id="aspect_ratio" title="Aspect Ratio" icon={faCropSimple} value={params.aspectRatio} options={predefinedAspectRatioList} handler={aspectRatioHandler} delimiter="/" />
            <ParameterDual id="dimensions" title="Dimensions" icon={faRulerCombined} value={params.dimensions} handler={dimensionsHandler} delimiter="x" unit="mm" />
            <ParameterDual id="resolution" title="Resolution" icon={faImage} value={params.resolution} options={predefinedResolutionList} handler={resolutionHandler} delimiter="x" />
            <Parameter id="megapixels" title="Megapixels" icon={faCamera} value={params.megapixels} handler={megapixelsHandler} unit="MP" />
            <Parameter id="ppi" title="Pixel Per Inch" icon={faCompassDrafting} value={params.ppi} handler={ppiHandler} unit="PPI" />
            <Parameter id="pixel_size" title="Pixel Size" icon={faRuler} value={params.pixelSize} handler={pixelSizeHandler} unit="μm" />
          </div>
          <div className="grid pt-4">
            <div className="pb-8 font-light">
              <FontAwesomeIcon
                icon={faObjectGroup}
                className="fas pr-2"
              />
              Sensor scheme:</div>
            <div className="flex justify-center">
              <SensorCanvas sizeX={+params.dimensions.a} sizeY={+params.dimensions.b} scale={200} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
