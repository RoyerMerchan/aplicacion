"use client";

import { useEffect, useState } from "react";
import { letters } from "@/data/letters";
import { readStorage, STORAGE_KEYS, writeStorage } from "@/lib/storage";

const validIds = new Set(letters.map((letter) => letter.id));
function loadOpened(): string[] {
  const value = readStorage<unknown>(STORAGE_KEYS.openedLetters, []);
  return Array.isArray(value)
    ? [...new Set(value.filter((id): id is string => typeof id === "string" && validIds.has(id)))]
    : [];
}

export function useLetters() {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [openedIds, setOpenedIds] = useState<string[]>([]);
  const [storageUnavailable, setStorageUnavailable] = useState(false);

  useEffect(() => {
    function sync() {
      setAuthenticated(readStorage<unknown>(STORAGE_KEYS.authenticated, false) === true);
      setOpenedIds(loadOpened());
      setReady(true);
    }
    // Restore only on the client, after the initial server-compatible render.
    const timer = window.setTimeout(sync, 0);
    function onStorage(event: StorageEvent) {
      if (event.key === null || Object.values(STORAGE_KEYS).some((key) => key === event.key)) sync();
    }
    window.addEventListener("storage", onStorage);
    return () => { window.clearTimeout(timer); window.removeEventListener("storage", onStorage); };
  }, []);

  function setAccess(value: boolean) {
    if (!writeStorage(STORAGE_KEYS.authenticated, value)) setStorageUnavailable(true);
    setAuthenticated(value);
  }

  function markOpened(id: string) {
    if (!validIds.has(id)) return;
    const updated = [...new Set([...loadOpened(), ...openedIds, id])];
    if (!writeStorage(STORAGE_KEYS.openedLetters, updated)) setStorageUnavailable(true);
    setOpenedIds(updated);
  }

  return { ready, authenticated, openedIds, storageUnavailable, setAccess, markOpened };
}
