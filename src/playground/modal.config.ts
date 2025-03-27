import { simplerModalFactory } from '../lib/simpler-modal';

export type DemoModals = {
  modal1: { title: string; content: string };
  modal2: { message: string };
};

export const { ModalProvider: DemoModalProvider, useModal: useDemoModal } =
  simplerModalFactory<DemoModals>({
    modal1: { isShowing: false, data: undefined },
    modal2: { isShowing: false, data: undefined },
  });
