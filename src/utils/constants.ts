export const DEFAULT_ARRAY_SIZE = 5;
export const DEFAULT_QUEUE_SIZE = 7;

export enum Direction {
  Ascending = "ascending",
  Descending = "descending",
};

export enum ElementStates {
  Default = "default",
  Selected = "selected",
  Changing = "changing",
  Modified = "modified",
  Invisible = "invisible",
};

export enum SortingAlgorithms {
  Bubble = "bubble",
  Selection = "selection",
};

export enum ElementCaptions {
  Top = "top",
  Head = "head",
  Tail = "tail",
};

export enum StackActions {
  Pop = "pop",
  Push = "push",
};

export enum QueueActions {
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
  Short = 500,
  Medium = 1000,
};
