// libraries
import { FC, FormEvent, useEffect, useMemo, useState } from "react";

// components 
import { Button, Circle, Input, SolutionLayout } from "../../ui";

// styles
import styles from "./queue.module.css";

// hooks
import useForm from "../../hooks/use-form";

// utils
import { ElementData } from "../../utils/element-data";
import { sequentialUpdate } from "../../utils/sequential-update";
import { DEFAULT_QUEUE_SIZE_LIMIT, ElementCaptions, MAX_ELEMENT_LENGTH, QueueActions } from "../../utils/constants";

// data structures 
import { Queue } from "../../data-structures/queue";



export const QueuePage: FC = () => {
  
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const { onChange } = useForm();
  
  const [action, setAction] = useState(QueueActions.Enqueue);
  const [isInProgress, setIsInProgress] = useState(false);
  
  const initialState = new Queue<string>(DEFAULT_QUEUE_SIZE_LIMIT);
  const [state, setState] = useState<Array<ElementData<string | undefined>>>(initialState.toArray());
  const [history, setHistory] = useState<Array<typeof state>>([]);
  
  const onSubmit = (action: QueueActions) => async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const queue = new Queue<string>(DEFAULT_QUEUE_SIZE_LIMIT, state);
    if (action === QueueActions.Enqueue) {
      setHistory(queue.enqueue(inputValue));
    } else if (action === QueueActions.Dequeue) {
      setHistory(queue.dequeue());
    } else if (action === QueueActions.Clear) {
      setHistory(queue.clear());
    };
    setInputValue("");
    setIsInputValid(false);
  };  
  
  useEffect(
    () => {
      let isMounted = true;
      if (history.length > 0) {
        setIsInProgress(true);
        sequentialUpdate<string | undefined>(history, setState, setIsInProgress, () => isMounted);
      };
      return () => {
        isMounted = false;
      };      
    }, 
    [history]
  );  
  
  const content = useMemo(
    () => (
      <ul className={styles.list}>
        {
          state.map(
            ({value, color, isHead, isTail}, index) => (
              <li className={styles.item} key={index}>
                <Circle
                  value={value}
                  color={color}
                  index={index}
                  above={isHead ? ElementCaptions.Head : undefined}
                  below={isTail ? ElementCaptions.Tail : undefined}
                />
              </li>
            )
          )
        }
      </ul>
    ),
    [state]
  );  
  
  return (
    <SolutionLayout title="Очередь">
      <section className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit(action)}>
          <Input 
            maxLength={MAX_ELEMENT_LENGTH}
            isLimitText={true}     
            value={inputValue}
            placeholder="Введите значение"
            onChange={onChange(setInputValue, setIsInputValid, false)}
          />
          <Button
            type="submit"
            text="Добавить"
            disabled={!isInputValid || (isInProgress && action !== QueueActions.Enqueue)}
            isLoader={isInProgress && action === QueueActions.Enqueue}            
            onClick={() => { setAction(QueueActions.Enqueue); }}
          />
          <Button
            type="submit"
            text="Удалить"
            disabled={state.every((element) => element.value === undefined) || (isInProgress && action !== QueueActions.Dequeue)}
            isLoader={isInProgress && action === QueueActions.Dequeue}            
            onClick={() => { setAction(QueueActions.Dequeue); }}
          />          
          <Button
            type="submit"
            text="Очистить"
            disabled={state.every((element) => element.value === undefined) || (isInProgress && action !== QueueActions.Clear)}
            isLoader={isInProgress && action === QueueActions.Clear}            
            onClick={() => { setAction(QueueActions.Clear); }}
            extraClass={styles.leftMargin}
          />                    
        </form>
        {content}
      </section>            
    </SolutionLayout>
  );
};
