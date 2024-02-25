import { ReactElement, useState } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

type SelectButtonItem<T extends string | { a: string, b: string }> = {
  title: string;
  value: T;
}

type SelectButtonProps<T extends string | { a: string, b: string }> = {
  options: SelectButtonItem<T>[];
  handler: (value: T) => void;
}

function SelectButton<T extends string | { a: string, b: string }>(props: SelectButtonProps<T>) {
  const [open, setOpen] = useState(0);

  function onClick() {
    setOpen(open ? 0 : 1);
  }

  function onClickSelect(value: T) {
    props.handler(value);
    setOpen(0);
  }

  function selectIcon() {
    return <FontAwesomeIcon
      icon={faAngleRight}
      className={open ? "fas transition rotate-90" : "fas transition"}
    />;
  }

  function optionElement(index: any, title: string, value: T) {
    return <div className="hover:bg-slate-300 transition-colors p-1" key={index} onClick={() => onClickSelect(value)}>
      {title}
    </div>;
  }

  function selectListContent(options: SelectButtonItem<T>[]) {
    if (open) {
      return (
        <div className="absolute right-0 z-10 w-40 backdrop-blur-md backdrop-grayscale rounded-md border-2 border-slate-300">
          <div className="overflow-y-auto text-right grid grid-flow-row gap-1">
            {options.map((option, index) => {
              return optionElement(index, option.title, option.value);
            })}
          </div>
        </div>
      );
    } else {
      return (<div></div>);
    }
  }

  return (
    <div className="relative">
      <div className="flex w-8 justify-center bg-slate-200">
        <div className="text-center py-1 px-4 select-none" onClick={onClick}>{selectIcon()}</div>
      </div>
      {selectListContent(props.options)}
    </div>
  )
}

type ParameterProps<T extends string | { a: string, b: string }> = {
  id: string;
  title: string;
  icon?: IconDefinition;
  value: T;
  options?: SelectButtonItem<T>[],
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
        {props.options &&
          <SelectButton options={props.options} handler={props.handler} />
        }
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
        {props.options &&
          <SelectButton options={props.options} handler={props.handler} />
        }
      </div>
    </div>
  )
}