class ListNode<T> {
  value: T;
  next: ListNode<T> | undefined;
  
  constructor(value: T, next: ListNode<T> | undefined = undefined) {
    this.value = value;
    this.next = next;
  };
};

export class LinkedList<T> {
  private head: ListNode<T> | undefined;
  size: number;
  
  constructor(fromArray: Array<T> = []) {
    this.head = undefined;
    this.size = 0;
    fromArray.forEach(
      (value) => this.insertToTail(value)
    );
  };
  
  toArray(): Array<T> {
    let result = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    };
    return result;
  };
  
  clear(): void {
    this.head = undefined;
    this.size = 0;
  };
  
  insertToHead(value: T): void {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    };
    this.size++;
  };
  
  removeFromHead(): void {
    if (!this.head) {
      throw new Error("No elements in the list");
    };
    this.head = this.head.next;
    this.size--;
  };  
  
  insertToTail(value: T): void {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      };
      current.next = newNode;
    };
    this.size++;
  };
  
  removeFromTail(): void {
    if (!this.head) {
      throw new Error("No elements in the list");
    };
    if (!this.head.next) {
      this.head = undefined;
    } else {
      let current = this.head;
      while (current.next!.next) {
        current = current.next!;
      };
      current.next = undefined;
    };
    this.size--;
  };  
  
  insertByIndex(value: T, index: number): void {
    if (index < 0 || index > this.size) {
      throw new Error("Index out of range");
    };
    if (index === 0) {
      this.insertToHead(value);
    } else if (index === this.size) {
      this.insertToTail(value);
    } else {
      let current = this.head;
      for (let i = 0; i < index-1; i++) {
        current = current!.next;
      };
      current!.next = new ListNode(value, current!.next);
      this.size++;
    };
  };
  
  removeByIndex(index: number): void {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of range");
    };
    if (index === 0) {
      this.removeFromHead();
    } else if (index === this.size-1) {
      this.removeFromTail();
    } else {
      let current = this.head;
      for (let i = 0; i < index-1; i++) {
        current = current!.next;
      };
      current!.next = current!.next!.next;
      this.size--;
    };
  };
};
