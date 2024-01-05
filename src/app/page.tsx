"use client";
import { useState } from "react";
import { SensorCanvas } from "@/components/sensorCanvas"

export function SelectButton() {
  return (
    <div className="flex w-8 justify-center bg-slate-100">
      <div>S</div>
    </div>
  )
}

export default function Home() {
  const [aspectRatio, setAspectRatio] = useState({x: 2, y: 3});

  return (
    <main className="container mx-auto">
      <div className="grid gap-x-4 gap-y-2 grid-cols-2">
        <div className="">
          <div className="pb-1">Aspect Ratio:</div>
          <div className="flex">
            <input type="number" id="aspect_ratio_x" value={aspectRatio.x} onChange={e => setAspectRatio({x: e.target.value, y: aspectRatio.y})} className="w-full basis-1/4 bg-slate-100 text-center" />
            <div className="basis-1/2 bg-slate-200 text-center">:</div>
            <input type="number" id="aspect_ratio_y" value={aspectRatio.y} onChange={e => setAspectRatio({x: aspectRatio.x, y: e.target.value})} className="w-full basis-1/4 bg-slate-300 text-center" />
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
      <SensorCanvas sizeX={1 * aspectRatio.x} sizeY={1 * aspectRatio.y} scale={200} />
    </main>
  )
}
