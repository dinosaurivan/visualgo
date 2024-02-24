import { ElementColors } from "../utils/constants";
import { ElementData } from "../utils/element-data";



class ListNode<T> {
  element: ElementData<T | undefined>;
  next?: ListNode<T>;
  
  constructor(element: ElementData<T | undefined>, next?: ListNode<T>) {
    this.element = element;
    this.next = next;
  };
};



export class LinkedList<T> {
  private head?: ListNode<T>;
  private history: Array<Array<ElementData<T | undefined>>>;
  private size: number;
  
  constructor(fromArray: Array<ElementData<T>> = []) {
    this.head = undefined;
    this.history = [];
    this.size = 0;
    fromArray.forEach(
      (element) => {
        this.push(element.value!);
      }
    );
  };
  
  toArray(): Array<ElementData<T | undefined>> {
    let result: Array<ElementData<T | undefined>> = [];
    let current = this.head;
    while (current !== undefined) {
      const deepCopy = new ElementData<T | undefined>(
        current.element.value, 
        current.element.color,
        current.element.isHead,
        current.element.isTail,
        current.element.valueAbove,
        current.element.valueBelow,
      );
      result.push(deepCopy);
      current = current.next;
    };
    return result;
  };  
  
  private save(): void {
    this.history.push(this.toArray());
  };
  
  private discard(): void {
    this.history = [];
  };
  
  private clear(): typeof this.history {
    this.discard();
    this.head = undefined;
    this.size = 0;
    this.save();
    return this.history;
  };
  
  unshift(value: T): typeof this.history {
    
    this.discard();
    
    const newElement = new ElementData<T | undefined>(undefined, ElementColors.Modified, true, false, value);
    const newNode = new ListNode(newElement);
    
    if (this.head === undefined) {
      this.head = newNode;
      this.head.element.isTail = true;
      this.save();
    } else {
      this.head.element.isHead = false;
      newNode.next = this.head;
      this.head = newNode;
      this.save();
    };
    
    this.head.element.valueAbove = undefined;
    this.head.element.value = value;
    this.save();
    
    this.head.element.color = ElementColors.Default;
    this.save();
    this.size++;
    
    return this.history;
  };
  
  shift(): typeof this.history {
    
    this.discard();
    
    if (this.head === undefined) {
      throw new Error("No elements in the list");
    };
    
    this.head.element.color = ElementColors.Changing;
    this.head.element.isHead = false;
    
    if (this.head.next) {
      this.head.next.element.isHead = true;
    } else {
      this.head.element.isTail = false;
    };
    this.save();  
    
    this.head.element.valueBelow = this.head.element.value
    this.head.element.value = undefined;
    this.save();
    
    this.head = this.head.next;
    this.save();
    this.size--;
    
    return this.history;
  };  
  
  push(value: T): typeof this.history {
    
    this.discard();
    
    const newElement = new ElementData<T | undefined>(undefined, ElementColors.Modified, false, true, value);
    const newNode = new ListNode(newElement);
    
    if (this.head === undefined) {
      
      this.head = newNode;
      this.head.element.isHead = true;
      this.save();      
      
      this.head.element.valueAbove = undefined;
      this.head.element.value = value;
      this.save();
      
      this.head.element.color = ElementColors.Default;
      this.save();      
      
    } else {
      
      let current = this.head;
      current.element.valueAbove = value;
      this.save();
      
      while (current.next) {
        current.element.valueAbove = undefined;
        current = current.next;
        current.element.valueAbove = value;
        this.save();
      };
      
      current.element.valueAbove = undefined;
      current.element.isTail = false;
      current.next = newNode;
      this.save();
      
      current.next.element.valueAbove = undefined;
      current.next.element.value = value;
      this.save();      
      
      current.next.element.color = ElementColors.Default;
      this.save();      
    };    
    
    this.size++;
    
    return this.history;
  };
  
  pop(): typeof this.history {
    
    this.discard();
    
    if (this.head === undefined) {
      throw new Error("No elements in the list");
    };    
    
    if (this.head.next === undefined) {
      
      this.head.element.color = ElementColors.Changing;
      this.head.element.isHead = false;
      this.head.element.isTail = false;
      this.save();
      
      this.head.element.valueBelow = this.head.element.value;
      this.head.element.value = undefined;
      this.save();
      
      this.head = undefined;
      this.save();
      
    } else {  
      
      let current = this.head;
      current.element.color = ElementColors.Changing;
      this.save();
      current.element.color = ElementColors.Default;
      
      while (current.next!.next) {
        current = current.next!;
        current.element.color = ElementColors.Changing;
        this.save();
        current.element.color = ElementColors.Default;
      };
      
      current.next!.element.color = ElementColors.Changing;
      current.next!.element.isTail = false;
      current.element.isTail = true;
      this.save();
      
      current.next!.element.valueBelow = current.next!.element.value;
      current.next!.element.value = undefined;
      this.save();
      
      current.next = undefined;
      this.save();
      
    };
    
    this.size--;
    
    return this.history;
  };  
  
  insert(value: T, index: number): typeof this.history {
    
    this.discard();
    
    if (index < 0 || index > this.size) {
      throw new Error("Index out of range");
    };
    
    if (index === 0) {
      return this.unshift(value);
    };
    
    if (index === this.size) {
      return this.push(value);
    };
    
    let current = this.head;
    current!.element.valueAbove = value;
    this.save();
    
    for (let i = 0; i < index-1; i++) {
      current!.element.valueAbove = undefined;        
      current = current!.next;
      current!.element.valueAbove = value;
      this.save();
    };
    
    current!.element.valueAbove = undefined;        
    const newElement = new ElementData<T | undefined>(undefined, ElementColors.Modified, false, false, value);
    current!.next = new ListNode(newElement, current!.next);
    this.save();
    
    current!.next.element.valueAbove = undefined;
    current!.next.element.value = value;
    this.save();
    
    current!.next.element.color = ElementColors.Default;
    this.save();
    
    this.size++;
    
    return this.history;
  };
  
  remove(index: number): typeof this.history {
    
    this.discard();
    
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of range");
    };
    
    if (index === 0) {
      return this.shift();
    };
    
    if (index === this.size-1) {
      return this.pop();
    };
    
    let current = this.head;
    current!.element.color = ElementColors.Changing;
    this.save();    
    current!.element.color = ElementColors.Default;
    
    for (let i = 0; i < index-1; i++) {
      current = current!.next;
      current!.element.color = ElementColors.Changing;
      this.save();
      current!.element.color = ElementColors.Default;
    };
    
    current!.next!.element.color = ElementColors.Changing;
    this.save();
    
    current!.next!.element.valueBelow = current!.next!.element.value;
    current!.next!.element.value = undefined;
    this.save();
    
    current!.next = current!.next!.next;
    this.save();
    
    this.size++;
    
    return this.history;    
  };
};
