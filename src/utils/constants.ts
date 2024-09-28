export const MAX_ELEMENT_LENGTH = 4;

export const DEFAULT_QUEUE_SIZE_LIMIT = 7;

export const DEFAULT_ARRAY_SIZE = 5;
export const MIN_ARRAY_SIZE = 3;
export const MAX_ARRAY_SIZE = 17;
export const MIN_ARRAY_VALUE = 1;
export const MAX_ARRAY_VALUE = 100;

export const MAX_FIBONACCI_LENGTH = 19;

export const MIN_STRING_LENGTH = 2;
export const MAX_STRING_LENGTH = 11;

export enum Direction {
  Ascending = "ascending",
  Descending = "descending",
};

export enum ElementColors {
  Default = "default",
  Selected = "selected",
  Changing = "changing",
  Modified = "modified",
  Invisible = "invisible",
};

export enum ElementCaptions {
  Top = "top",
  Head = "head",
  Tail = "tail",
};

export enum SortingActions {
  Bubble = "bubble",
  Selection = "selection",
};

export enum StackActions {
  Pop = "pop",
  Push = "push",
  Clear = "clear",
};

export enum QueueActions {
  Clear = "clear",
  Enqueue = "enqueue",
  Dequeue = "dequeue",
};

export enum LinkedListActions {
  Pop = "pop",
  Push = "push",
  Shift = "shift",
  Insert = "insert",
  Remove = "remove",
  Unshift = "unshift",
};

export enum Delay {
  None = 0,
  Medium = 500,
};
