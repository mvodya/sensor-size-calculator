"use client";
import { useState } from "react";
import { SensorCanvas } from "@/components/sensorCanvas"
import { Parameter, ParameterDual } from "@/components/parameter";

export default function Home() {
  const [aspectRatio, setAspectRatio] = useState({ x: 2, y: 3 });

  return (
    <main className="container mx-auto">
      <div className="grid gap-x-4 gap-y-2 grid-cols-2">
        <ParameterDual id="aspect_ratio" title="Aspect Ratio" delimiter="/" />
        <ParameterDual id="diagonal" title="Diagonal" delimiter="/" />
        <ParameterDual id="resolution" title="Resolution" delimiter="x" />
        <Parameter id="megapixels" title="Megapixels" unit="MP" />
        <Parameter id="ppi" title="Pixel Per Inch" unit="PPI" />
        <Parameter id="pixel_size" title="Pixel Size" unit="μm" />
      </div>
      <SensorCanvas sizeX={1 * aspectRatio.x} sizeY={1 * aspectRatio.y} scale={200} />
    </main>
  )
}
