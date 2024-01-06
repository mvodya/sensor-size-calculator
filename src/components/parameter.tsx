import { useState } from "react";

function SelectButton() {
  return (
    <div className="flex w-8 justify-center bg-slate-100">
      <div>S</div>
    </div>
  )
}

type ParameterProps<T extends number | {a: number, b: number}> = {
  id: string;
  title: string;
  delimiter?: string;
  unit?: string;
  defaultValue?:T
}

export function Parameter(props: ParameterProps<number>) {
  const [value, setValue] = useState(props.defaultValue ?? 0);

  return (
    <div className="">
      <div className="pb-1">{props.title}:</div>
      <div className="flex">
        <input type="number" id={props.id} value={value} onChange={e => setValue(+e.target.value)} className="w-full basis-1/2 bg-slate-100 text-center" />
        <div className="basis-1/2 bg-slate-300 text-center">{props.unit}</div>
        <SelectButton />
      </div>
    </div>
  )
}

export function ParameterDual(props: ParameterProps<{a: number, b: number}>) {
  props.defaultValue

  const [value, setValue] = useState(props.defaultValue ?? { a: 0, b: 0 });

  return (
    <div className="">
      <div className="pb-1">{props.title}:</div>
      <div className="flex">
        <input type="number" id={props.id + "_a"} value={value.a} onChange={e => setValue({ a: +e.target.value, b: value.b })} className="w-full basis-1/4 bg-slate-100 text-center" />
        <div className="basis-1/2 bg-slate-200 text-center">{props.delimiter ?? "/"}</div>
        <input type="number" id={props.id + "_b"} value={value.b} onChange={e => setValue({ a: value.a, b: +e.target.value })} className="w-full basis-1/4 bg-slate-300 text-center" />
        <SelectButton />
      </div>
    </div>
  )
}