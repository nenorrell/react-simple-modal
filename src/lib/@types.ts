/**
 * Options for modal actions that support merging data.
 */
export interface MergeOptions {
  /**
   * If true, merge new data with the existing data (when both are objects)
   */
  mergeData?: boolean;
}

/**
 * Options for hiding a modal.
 */
export interface HideOptions {
  /**
   * If true, retain the modal's data after hiding it.
   */
  persistData?: boolean;
}

/**
 * Represents the state for all modals.
 *
 * Each property in the state corresponds to a modal key defined in the generic type `M`.
 * Each modal has:
 *  - `isShowing`: A boolean indicating whether the modal is currently open.
 *  - `data`: Optional data associated with the modal, whose type is defined by `M[K]`.
 *
 * @template M - A mapping from modal keys to their corresponding data types.
 */
export type ModalState<M extends Record<string, any>> = {
  [K in keyof M]: { isShowing: boolean; data?: M[K] };
};

/**
 * Represents an action that can be dispatched to the modal reducer.
 *
 * This union type supports the following actions:
 *
 * - **SHOW_MODAL**: Opens a modal with the provided data.
 *   - Uses MergeOptions: If mergeData is true and both existing and new data are objects, they are merged.
 *
 * - **HIDE_MODAL**: Closes a modal.
 *   - Uses HideOptions: If persistData is true, the modal’s data is retained.
 *
 * - **TOGGLE_MODAL**: Toggles the open state of a modal.
 *   - When opening, accepts data with an optional MergeOptions.
 *
 * - **UPDATE_MODAL_DATA**: Updates the modal’s data without changing its open/closed state.
 *   - Uses MergeOptions: If mergeData is true and both current and new data are objects, they will be merged.
 *
 * @template M - A mapping from modal keys to their corresponding data types.
 */
export type ModalAction<M extends Record<string, any>> =
  | {
      type: 'SHOW_MODAL';
      modalType: keyof M;
      data?: M[keyof M];
      options?: MergeOptions;
    }
  | {
      type: 'HIDE_MODAL';
      modalType: keyof M;
      options?: HideOptions;
    }
  | {
      type: 'TOGGLE_MODAL';
      modalType: keyof M;
      data?: M[keyof M];
      options?: MergeOptions;
    }
  | {
      type: 'UPDATE_MODAL_DATA';
      modalType: keyof M;
      data: Partial<M[keyof M]>;
      options?: MergeOptions;
    };
