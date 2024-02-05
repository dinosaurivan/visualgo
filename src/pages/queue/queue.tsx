// libraries
import { FC, FormEvent, useCallback, useMemo, useState } from "react";

// components 
import { Button, Circle, Input, SolutionLayout } from "../../ui";

// styles
import styles from "./queue.module.css";

// hooks
import useForm from "../../hooks/use-form";

// utils
import { DEFAULT_QUEUE_SIZE, ElementCaptions, QueueActions } from "../../utils/constants";
import { ElementData } from "../../utils/element-data";

// algorithms 
import { enqueue } from "../../algorithms/queue/enqueue";
import { dequeue } from "../../algorithms/queue/dequeue";



export const QueuePage: FC = () => {
  
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const { onChange } = useForm();
  
  const getEmptyQueue = useCallback(
    () => Array.from(
      { length: DEFAULT_QUEUE_SIZE }, 
      () => new ElementData("")
    ),
    []
  );
  
  const [action, setAction] = useState(QueueActions.Enqueue);
  const [isInProgress, setIsInProgress] = useState(false);
  const [currentQueueState, setCurrentQueueState] = useState(getEmptyQueue());
  
  const pointers = useMemo(
    () => {
      const length = currentQueueState.length;
      const head = currentQueueState.findIndex((element) => element.isHead);
      const tail = currentQueueState.findIndex((element) => element.isTail);
      const size = (head === -1 || tail === -1) ? 0 : (tail - head + 1);
      return { length, head, tail, size };
    },
    [currentQueueState]
  );
  
  const onSubmit = (action: QueueActions) => async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsInProgress(true);
    if (action === QueueActions.Enqueue) {
      await enqueue(inputValue, pointers, currentQueueState, setCurrentQueueState);
    } else if (action === QueueActions.Dequeue) {
      await dequeue(pointers, currentQueueState, setCurrentQueueState);
    };
    setInputValue("");
    setIsInProgress(false);
  };  
  
  const onReset = (event: FormEvent): void => {
    event.preventDefault();
    setCurrentQueueState(getEmptyQueue());
  };
  
  const content = useMemo(
    () => {
      return (
        <ul className={styles.list}>
          {
            currentQueueState.map(
              ({state, value, isHead, isTail}, index) => {
                return (
                  <li className={styles.item} key={index}>
                    <Circle
                      state={state}
                      value={value}
                      index={index}
                      above={isHead ? ElementCaptions.Head : undefined}
                      below={isTail ? ElementCaptions.Tail : undefined}
                    />
                  </li>
                )
              }
            )
          }
        </ul>
      );
    },
    [currentQueueState]
  );   
  
  return (
    <SolutionLayout title="Очередь">
      <section className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit(action)} onReset={onReset}>
          <Input 
            maxLength={4}
            isLimitText={true}     
            value={inputValue}
            placeholder="Введите значение"
            onChange={onChange(setInputValue, setIsInputValid)}
          />
          <Button
            type="submit"
            text="Добавить"
            disabled={!isInputValid || inputValue.length === 0 || pointers.tail === pointers.length-1}
            isLoader={isInProgress}
            onClick={() => { setAction(QueueActions.Enqueue); }}
          />
          <Button
            type="submit"
            text="Удалить"
            disabled={pointers.head === -1}
            isLoader={isInProgress}
            onClick={() => { setAction(QueueActions.Dequeue); }}
          />          
          <Button
            type="reset"
            text="Очистить"
            disabled={pointers.head === -1}
            isLoader={isInProgress}
            extraClass={styles.leftMargin}
          />                    
        </form>
        {content}
      </section>            
    </SolutionLayout>
  );
};
