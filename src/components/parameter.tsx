import { ReactElement, useState } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

function SelectButton() {
  const [open, setOpen] = useState(0);

  function onClick() {
    setOpen(open ? 0 : 1);
  }

  function selectIcon() {
    return <FontAwesomeIcon
      icon={faAngleRight}
      className={open ? "fas transition rotate-90" : "fas transition"}
    />;
  }

  return (
    <div className="flex w-8 justify-center bg-slate-200">
      <div className="text-center py-1 px-4 select-none" onClick={onClick}>{selectIcon()}</div>
    </div>
  )
}

type ParameterProps<T extends string | { a: string, b: string }> = {
  id: string;
  title: string;
  icon?: IconDefinition;
  value: T;
  handler: (value: T) => void;
  delimiter?: string;
  unit?: string;
}

export function Parameter(props: ParameterProps<string>) {
  return (
    <div className="">
      <div className="pb-1 font-light">
        {props.icon !== undefined &&
          <FontAwesomeIcon
            icon={props.icon}
            className="fas pr-2"
          />
        }
        {props.title}:</div>
      <div className="flex border-4 rounded-md">
        <input type="number" id={props.id} value={props.value} onChange={e => props.handler(e.target.value)} className="w-full bg-slate-100 text-center p-1 truncate hover:text-clip" />
        <div className="bg-slate-200 text-center py-1 px-4">{props.unit}</div>
        <SelectButton />
      </div>
    </div>
  )
}

export function ParameterDual(props: ParameterProps<{ a: string, b: string }>) {
  return (
    <div className="">
      <div className="pb-1 font-light">
        {props.icon !== undefined &&
          <FontAwesomeIcon
            icon={props.icon}
            className="fas pr-2"
          />
        }
        {props.title}:
      </div>
      <div className="flex border-4 rounded-md">
        <input type="number" id={props.id + "_a"} value={props.value.a} onChange={e => props.handler({ ...props.value, a: e.target.value })} className="w-full bg-slate-100 text-center p-1 truncate hover:text-clip" />
        <div className="bg-slate-200 text-center py-1 px-4">{props.delimiter ?? "/"}</div>
        <input type="number" id={props.id + "_b"} value={props.value.b} onChange={e => props.handler({ ...props.value, b: e.target.value })} className="w-full bg-slate-100 text-center p-1 truncate hover:text-clip" />
        <SelectButton />
      </div>
    </div>
  )
}