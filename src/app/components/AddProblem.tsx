"use client";

import { useState, useTransition } from "react";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function AddProblem() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [, startTransition] = useTransition();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      problemUrl: "",
    },
  });

  const onSubmit = async ({ problemUrl }: { problemUrl: string }) => {
    await fetch("/api/problems", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        problemUrl,
      }),
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        startTransition(() => {
          router.refresh();
          setIsOpen(false);
        });
      });
  };

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
          <form
            className="flex flex-col pt-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="url" className="flex flex-col gap-1">
              Problem URL{" "}
              <input
                className="bg-zinc-800 p-2"
                {...register("problemUrl", {
                  required: "URL is required",
                })}
              />
            </label>
            {errors.problemUrl && (
              <div className="text-red-500">{errors.problemUrl.message}</div>
            )}
            <div className="p-2"></div>
            <div className="flex items-center gap-2">
              <button
                className="bg-sky-600 py-2 px-4 text-sm rounded-md"
                type="submit"
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
          </form>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}
