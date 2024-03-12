import { Dispatch, ReactNode, SetStateAction } from 'react';

type SetDispatchGeneral<T> = Dispatch<SetStateAction<T>>;

type ModalProps = {
  tamano?: "sm" | "md" | "lg";
  children: ReactNode;
  onClose: () => void;
};

export type { SetDispatchGeneral, ModalProps };
