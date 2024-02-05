type QueuePointersType = {
  length: number,
  head: number,
  tail: number,
  size: number,
};

export class QueuePointers implements QueuePointersType {
  length: number;
  head: number;
  tail: number;
  size: number;
  constructor(
    length: number,
    head: number,
    tail: number,
    size: number, 
  ) {
    this.length = length;
    this.head = head;
    this.tail = tail;
    this.size = size;
  };
};
