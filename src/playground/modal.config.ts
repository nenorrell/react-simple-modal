import { simpleModalFactory } from '../lib/simple-modal';

export type DemoModals = {
  modal1: { title: string; content: string };
  modal2: { message: string };
  modal3: { info: string };
};

export const { ModalProvider: DemoModalProvider, useModal: useDemoModal } =
  simpleModalFactory<DemoModals>({
    modal1: { isShowing: false, data: undefined },
    modal2: { isShowing: false, data: undefined },
    modal3: { isShowing: false, data: undefined },
  });
