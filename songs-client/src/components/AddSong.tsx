import React, { useCallback, useEffect, useRef, useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  ISong,
  LoadingStates,
  requestAddSong,
  requestEditSong,
} from "../reducers/songs";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Modal from "./ui/Modal";

function AddSong({
  isOpen,
  close,
  song,
  isEditing = false,
}: {
  isOpen: boolean;
  close: () => void;
  song: ISong | null;
  isEditing?: boolean;
}) {
  const initialFormState = useMemo<ISong>(
    () => ({
      artist: "",
      title: "",
      album: "",
      genre: "",
    }),
    [],
  );

  const loadingState = useAppSelector((state) => state.songs.loadingState);
  const prevLoadingState = useRef(LoadingStates.IDLE);

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    defaultValues: initialFormState,
  });

  const onSubmit: SubmitHandler<any> = (song) => {
    dispatch(isEditing ? requestEditSong(song) : requestAddSong(song));
  };

  const onClose = useCallback(() => {
    reset(initialFormState);
    close();
  }, [close, initialFormState, reset]);

  useEffect(() => {
    if (song) {
      reset(song);
    }
  }, [song, reset]);

  useEffect(() => {
    const prev = prevLoadingState.current;
    prevLoadingState.current = loadingState;

    // Close the modal if we've had a successful add or edit
    if (prev !== LoadingStates.IDLE && loadingState === LoadingStates.IDLE) {
      onClose();
    }
  }, [loadingState, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit song" : "Add song"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
        <div>
          <Input
            placeholder="Artist"
            register={register}
            required
            name="artist"
          />
        </div>
        <div>
          <Input
            placeholder="Song title"
            register={register}
            required
            name="title"
          />
        </div>
        <div>
          <Input
            placeholder="Album"
            register={register}
            required
            name="album"
          />
        </div>
        <div>
          <Input
            placeholder="Genre"
            register={register}
            required
            name="genre"
          />
        </div>

        <div className="mt-4">
          <Button disabled={!isValid} type="submit" className="mr-2">
            {isEditing ? "Save" : "Add song"}
          </Button>
          <Button outline onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
  /*
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
            <div className="fixed inset-0 bg-black/25" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {isEditing ? 'Edit song' : 'Add song'}
                  </Dialog.Title>
                  

                  <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
                        <div>
                            <Input
                                placeholder="Artist"
                                register={register}
                                name="artist"
                            />
                        </div>
                        <div>
                            <Input
                                placeholder="Song title"
                                register={register}
                                name="title"
                            />
                        </div>
                        <div>
                            <Input
                                placeholder="Album"
                                register={register}
                                name="album"
                            />
                        </div>
                        <div>
                            <Input
                                placeholder="Genre"
                                register={register}
                                name="genre"
                            />
                        </div>
                        
                        <input type="submit" title="Add song"/>
                    </form>

                  <div className="mt-4">
                    <Button
                      onClick={onClose}
                    >
                        {isEditing ? 'Save' : 'Add song'}
                    </Button>
                    <Button
                      onClick={onClose}
                    >
                        Cancel
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );*/
}

export default AddSong;
