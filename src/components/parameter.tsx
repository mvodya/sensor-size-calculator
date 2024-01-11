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
      <div className="pb-1 font-light">{props.title}:</div>
      <div className="flex border-4 rounded-md">
        <input type="number" id={props.id} value={props.value} onChange={e => props.handler(e.target.value)} className="w-full bg-slate-100 text-center p-1 truncate hover:text-clip" />
        <div className="bg-slate-200 text-center py-1 px-4">{props.unit}</div>
        {/* <SelectButton /> */}
      </div>
    </div>
  )
}

export function ParameterDual(props: ParameterProps<{ a: string, b: string }>) {
  return (
    <div className="">
      <div className="pb-1 font-light">{props.title}:</div>
      <div className="flex border-4 rounded-md">
        <input type="number" id={props.id + "_a"} value={props.value.a} onChange={e => props.handler({ ...props.value, a: e.target.value })} className="w-full bg-slate-100 text-center p-1 truncate hover:text-clip" />
        <div className="bg-slate-200 text-center py-1 px-4">{props.delimiter ?? "/"}</div>
        <input type="number" id={props.id + "_b"} value={props.value.b} onChange={e => props.handler({ ...props.value, b: e.target.value })} className="w-full bg-slate-100 text-center p-1 truncate hover:text-clip" />
        {/* <SelectButton /> */}
      </div>
    </div>
  )
}