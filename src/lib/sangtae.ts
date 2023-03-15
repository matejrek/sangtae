import { useState, useEffect } from "react";

type Listener = (state: any) => void;

interface Sangtae<T> {
  key: string;
  value: T;
  listeners: Listener[];
  [key: string]: any;
}

const state: { [key: string]: Sangtae<any> } = {};

type Actions<T> = { [key: string]: (state: T, ...args: any[]) => T };

export function createSangtae<T>(name: string, initialValue: T, actions?: Actions<T>): Sangtae<T> {
  const key = name;
  const sangtae: Sangtae<T> = {
    key,
    value: initialValue,
    listeners: [],
  };

  if (actions) {
    for (const [actionName, actionFn] of Object.entries(actions)) {
      sangtae[actionName] = (...args: any[]) => {
        const newValue = actionFn(sangtae.value, ...args);
        sangtae.value = newValue;
        for (const listener of sangtae.listeners) {
          listener(sangtae.value);
        }
      };
    }
  }

  state[key] = sangtae;
  return sangtae;
}

export function useSangtae<T>(sangtae: Sangtae<T>): [T, (newValue: T) => void] {
  const [, setState] = useState({});
  useEffect(() => {
    const listener: Listener = () => setState({});
    sangtae.listeners.push(listener);
    return () => {
      const index = sangtae.listeners.indexOf(listener);
      sangtae.listeners.splice(index, 1);
    };
  }, [sangtae]);
  return [
    sangtae.value,
    (newValue: T) => {
      sangtae.value = newValue;
      for (const listener of sangtae.listeners) {
        listener(sangtae.value);
      }
    },
  ];
}
