import ElementData from "../../utils/element-data";



class ListNode<T> {
  element: ElementData<T | undefined>;
  
  next?: ListNode<T>;
  
  constructor(element: ElementData<T | undefined>, next?: ListNode<T>) {
    this.element = element;
    this.next = next;
  };
};

export default ListNode;
