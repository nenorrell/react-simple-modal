import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import type { HideOptions, MergeOptions, ModalAction, ModalState } from './@types';

const modalReducer = <M extends Record<string, any>>(
  state: ModalState<M>,
  action: ModalAction<M>,
): ModalState<M> => {
  switch (action.type) {
    case 'SHOW_MODAL': {
      const { mergeData } = action.options || {};
      const currentData = state[action.modalType]?.data;
      const newData =
        mergeData && typeof currentData === 'object' && typeof action.data === 'object'
          ? { ...currentData, ...action.data }
          : action.data;
      return {
        ...state,
        [action.modalType]: { isShowing: true, data: newData },
      };
    }
    case 'HIDE_MODAL': {
      const { persistData } = action.options || {};
      return {
        ...state,
        [action.modalType]: {
          isShowing: false,
          data: persistData ? state[action.modalType]?.data : undefined,
        },
      };
    }
    case 'TOGGLE_MODAL': {
      const isCurrentlyShowing = state[action.modalType]?.isShowing || false;
      const { mergeData } = action.options || {};
      const currentData = state[action.modalType]?.data;
      const newData =
        !isCurrentlyShowing &&
        mergeData &&
        typeof currentData === 'object' &&
        typeof action.data === 'object'
          ? { ...currentData, ...action.data }
          : !isCurrentlyShowing
            ? action.data
            : undefined;
      return {
        ...state,
        [action.modalType]: {
          isShowing: !isCurrentlyShowing,
          data: newData,
        },
      };
    }
    case 'UPDATE_MODAL_DATA': {
      const { mergeData } = action.options || {};
      const currentData = state[action.modalType]?.data;
      const newData =
        mergeData && typeof currentData === 'object' && typeof action.data === 'object'
          ? { ...currentData, ...action.data }
          : action.data;
      return {
        ...state,
        [action.modalType]: {
          isShowing: state[action.modalType]?.isShowing || false,
          data: newData,
        },
      };
    }
    default:
      return state;
  }
};

/**
 * Factory for creating a modal context with a strongly typed API.
 *
 * @template M - A mapping from modal keys to their corresponding data types.
 * @param initialState - The initial modal state.
 * @returns An object containing:
 *  - ModalProvider: The context provider component.
 *  - useModal: A hook to access modal actions and state.
 */
export function simplerModalFactory<M extends Record<string, any>>(initialState: ModalState<M>) {
  const ModalContext = createContext<{
    state: ModalState<M>;
    dispatch: React.Dispatch<ModalAction<M>>;
  } | null>(null);

  const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(modalReducer, initialState);
    return <ModalContext.Provider value={{ state, dispatch }}>{children}</ModalContext.Provider>;
  };

  /**
   * Custom hook for interacting with the modal context.
   *
   * Provides methods to show, hide, toggle, and update modal data.
   *
   * @returns An object with methods for controlling modal state:
   *  - `showModal`: Opens a modal with the provided data.
   *  - `hideModal`: Closes a modal, with an option to persist its data.
   *  - `toggleModal`: Toggles the modal's open state.
   *  - `updateModalData`: Updates modal data without changing its open/closed state.
   *  - `isModalOpen`: Returns whether a modal is open.
   *  - `getModalData`: Returns the modal's data.
   */
  const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
      throw new Error('useModal must be used within its corresponding ModalProvider');
    }
    const { state, dispatch } = context;

    /**
     * Opens a modal.
     *
     * @param modalType - The key of the modal to show.
     * @param data - The data to associate with the modal.
     * @param options - Options for showing the modal. (See MergeOptions)
     */
    const showModal = <K extends keyof M>(modalType: K, data: M[K], options?: MergeOptions) => {
      dispatch({ type: 'SHOW_MODAL', modalType, data, options });
    };

    /**
     * Closes a modal.
     *
     * @param modalType - The key of the modal to hide.
     * @param options - Options for hiding the modal. (See HideOptions)
     */
    const hideModal = <K extends keyof M>(modalType: K, options?: HideOptions) => {
      dispatch({ type: 'HIDE_MODAL', modalType, options });
    };

    /**
     * Toggles a modal's visibility.
     *
     * @param modalType - The key of the modal to toggle.
     * @param data - The data to apply when opening the modal.
     * @param options - Options for toggling the modal. (See MergeOptions)
     */
    const toggleModal = <K extends keyof M>(modalType: K, data: M[K], options?: MergeOptions) => {
      dispatch({ type: 'TOGGLE_MODAL', modalType, data, options });
    };

    /**
     * Updates a modal's data without changing its open/closed state.
     *
     * @param modalType - The key of the modal to update.
     * @param data - Partial data to update the modal with.
     * @param options - Options for updating modal data. (See MergeOptions)
     */
    const updateModalData = <K extends keyof M>(
      modalType: K,
      data: Partial<M[K]>,
      options?: MergeOptions,
    ) => {
      dispatch({ type: 'UPDATE_MODAL_DATA', modalType, data, options });
    };

    /**
     * Checks if a modal is open.
     *
     * @param modalType - The key of the modal.
     * @returns True if the modal is open, false otherwise.
     */
    const isModalOpen = <K extends keyof M>(modalType: K): boolean => !!state[modalType]?.isShowing;

    /**
     * Retrieves the data associated with a modal.
     *
     * @param modalType - The key of the modal.
     * @returns The modal's data or undefined if no data is set.
     */
    const getModalData = <K extends keyof M>(modalType: K): M[K] | undefined =>
      state[modalType]?.data;

    return { showModal, hideModal, toggleModal, updateModalData, isModalOpen, getModalData };
  };

  return { ModalProvider, useModal };
}
