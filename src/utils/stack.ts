export class Stack<T> {
  private container: Array<T>;
  
  constructor(fromArray: Array<T> = []) {
    this.container = [...fromArray];
  };
  
  elements(): Array<T> {
    return this.container;
  };  
  
  clear(): void {
    this.container = [];
  };
  
  push(item: T): void {
    this.container.push(item);
  };
  
  pop(): void {
    this.container.pop();
  };
  
  size(): number {
    return this.container.length;
  };
  
  isEmpty(): boolean {
    return this.size() === 0;
  };
  
  peak(): T | undefined {
    return this.container[this.size() - 1];
  };
};
