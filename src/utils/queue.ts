export class Queue<T> {
  private container: Array<T | undefined>;
  private readonly maxSize: number;
  
  constructor(maxSize: number) {
    this.maxSize = maxSize;
    this.container = new Array(maxSize);
  };
  
  elements(): Array<T | undefined> {
    return this.container;
  };
  
  clear(): void {
    this.container = new Array(this.maxSize);
  };
  
  headIndex(): number {
    return this.container.findIndex(
      (element) => element !== undefined
    );  
  };
  
  head(): T | undefined {
    return this.container[this.headIndex()];
  };
  
  tailIndex(): number {
    return this.container.findLastIndex(
      (element) => element !== undefined
    );
  };
  
  tail(): T | undefined {
    return this.container[this.tailIndex()];
  };
  
  size(): number {
    return (this.headIndex() === -1) ? 0 : (this.tailIndex() - this.headIndex() + 1);
  };
  
  isEmpty(): boolean {
    return this.size() === 0;
  };
  
  enqueue(item: T): void {
    if (this.tailIndex() === this.maxSize - 1) {
      throw new Error("Maximum size exceeded");
    };
    this.container[this.tailIndex() + 1] = item;
  };
  
  dequeue(): void {
    if (this.headIndex() === -1) {
      throw new Error("No elements in the queue");
    };    
    this.container[this.headIndex()] = undefined;
  };
};
