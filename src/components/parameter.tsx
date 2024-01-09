import { useState } from "react";

function SelectButton() {
  return (
    <div className="flex w-8 justify-center bg-slate-100">
      <div>S</div>
    </div>
  )
}

type ParameterProps<T extends string | { a: string, b: string }> = {
  id: string;
  title: string;
  value: T;
  handler: (value: T) => void;
  delimiter?: string;
  unit?: string;
}

export function Parameter(props: ParameterProps<string>) {
  return (
    <div className="">
      <div className="pb-1">{props.title}:</div>
      <div className="flex">
        <input type="number" id={props.id} value={props.value} onChange={e => props.handler(e.target.value)} className="w-full basis-1/2 bg-slate-100 text-center" />
        <div className="basis-1/2 bg-slate-300 text-center">{props.unit}</div>
        <SelectButton />
      </div>
    </div>
  )
}

export function ParameterDual(props: ParameterProps<{ a: string, b: string }>) {
  return (
    <div className="">
      <div className="pb-1">{props.title}:</div>
      <div className="flex">
        <input type="number" id={props.id + "_a"} value={props.value.a} onChange={e => props.handler({ ...props.value, a: e.target.value })} className="w-full basis-1/4 bg-slate-100 text-center" />
        <div className="basis-1/2 bg-slate-200 text-center">{props.delimiter ?? "/"}</div>
        <input type="number" id={props.id + "_b"} value={props.value.b} onChange={e => props.handler({ ...props.value, b: e.target.value })} className="w-full basis-1/4 bg-slate-300 text-center" />
        <SelectButton />
      </div>
    </div>
  )
}