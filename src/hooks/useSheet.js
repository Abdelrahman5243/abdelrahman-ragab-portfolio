import { useCallback, useSyncExternalStore } from "react";

// Only one bottom sheet may be open at a time. Each sheet has an id; opening
// one replaces whichever sheet was open, so two sheets never stack.
let openId = null;
const listeners = new Set();

const setOpenId = (next) => {
  if (next === openId) return;
  openId = next;
  listeners.forEach((listener) => listener());
};

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => openId;

export function useSheet(id) {
  const current = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const setOpen = useCallback(
    (open) => {
      if (open) setOpenId(id);
      else if (openId === id) setOpenId(null);
    },
    [id]
  );

  return [current === id, setOpen];
}
