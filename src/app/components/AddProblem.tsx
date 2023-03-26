"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";

export default function AddProblem() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-8">
      <button
        className="bg-sky-600 py-2 px-4 rounded-md"
        onClick={() => setIsOpen(true)}
      >
        I solved a new problem
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 p-8 rounded-lg min-w-[800px]"
      >
        <Dialog.Panel>
          <Dialog.Title className="text-2xl font-bold">
            Add a new problem
          </Dialog.Title>
          <form className="flex flex-col pt-4">
            <label htmlFor="link" className="flex flex-col gap-1">
              Problem link <input className="bg-zinc-800 p-2" />
            </label>
          </form>
          <div className="p-2"></div>
          <div className="flex items-center gap-2">
            <button
              className="bg-sky-600 py-2 px-4 text-sm rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Add
            </button>
            <button
              className="bg-zinc-600 py-2 px-4 text-sm rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}
