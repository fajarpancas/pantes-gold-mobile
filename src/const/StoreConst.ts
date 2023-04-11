import produce from 'immer';

export const clearStore = (set: any, InitialStore: any) => {
  set(
    produce(() => InitialStore),
    true,
  );
};
