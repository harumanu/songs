import React, { Fragment, MouseEventHandler, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoCloseCircleSharp } from "react-icons/io5";

function Modal({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: Function;
  title: string;
  children: ReactNode;
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        open={isOpen}
        onClose={() => onClose()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-800 text-white p-12 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="mb-6 flex space-between items-center w-full"
                >
                  <h3 className="text-2xl font-medium leading-6 w-full">
                    {title}
                  </h3>
                  <IoCloseCircleSharp
                    onClick={onClose as MouseEventHandler}
                    fontSize={32}
                    className="text-white/50 hover:text-white cursor-pointer"
                  />
                </Dialog.Title>

                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
