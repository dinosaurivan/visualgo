// libraries
import React, { JSX, FormEventHandler, MouseEventHandler, useEffect, useMemo, useState } from "react";

// components 
import { Button, Circle, Input, SolutionLayout } from "../../ui";

// styles
import styles from "./queue.module.css";

// hooks
import useForm from "../../hooks/use-form";

// utils
import ElementData from "../../utils/element-data";
import sequentialUpdate from "../../utils/sequential-update";
import { DEFAULT_QUEUE_SIZE_LIMIT, ElementCaptions, MAX_ELEMENT_LENGTH, QueueActions } from "../../utils/constants";

// data structures 
import { Queue } from "../../data-structures";



export default function QueuePage(): JSX.Element {
  
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const { onChange } = useForm();
  
  const [action, setAction] = useState(QueueActions.Enqueue);
  const [isInProgress, setIsInProgress] = useState(false);
  
  const initialState = new Queue<string>(DEFAULT_QUEUE_SIZE_LIMIT);
  const [step, setStep] = useState<Array<ElementData<string | undefined>>>(initialState.toArray());
  const [steps, setSteps] = useState<Array<typeof step>>([]);
  
  const onEnqueue: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setAction(QueueActions.Enqueue);
    const queue = new Queue<string>(DEFAULT_QUEUE_SIZE_LIMIT, step);
    setSteps(queue.getEnqueueSteps(inputValue));
    setInputValue("");
    setIsInputValid(false);
  };  
  
  const onDequeue: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    setAction(QueueActions.Dequeue);
    const queue = new Queue<string>(DEFAULT_QUEUE_SIZE_LIMIT, step);
    setSteps(queue.getDequeueSteps());
  };  
  
  const onClear: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    setAction(QueueActions.Clear);
    const queue = new Queue<string>(DEFAULT_QUEUE_SIZE_LIMIT, step);
    setSteps(queue.getClearSteps());
  };  
  
  useEffect(
    () => {
      let isMounted = true;
      if (steps.length > 0) {
        setIsInProgress(true);
        sequentialUpdate<string | undefined>(steps, setStep, setIsInProgress, () => isMounted);
      };
      return () => {
        isMounted = false;
      };      
    }, 
    [steps]
  );  
  
  const content = useMemo(
    () => (
      <ul className={styles.list}>
        {
          step.map(
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
    [step]
  );  
  
  return (
    <SolutionLayout title="Queue">
      <section className={styles.container} data-testid="queue-page">
        <form className={styles.form} onSubmit={onEnqueue} data-testid="form">
          <Input 
            maxLength={MAX_ELEMENT_LENGTH}
            isLimitText={true}     
            value={inputValue}
            placeholder="Enter a value"
            data-testid="input"
            onChange={onChange(setInputValue, setIsInputValid, false)}
          />
          <Button
            type="submit"
            text="Add to queue"
            data-testid="enqueue-button"
            isLoader={isInProgress && action === QueueActions.Enqueue}            
            disabled={
              !isInputValid ||
              (isInProgress && action !== QueueActions.Enqueue) ||
              step.every((element) => element.value !== undefined)
            }
          />
          <Button
            type="button"
            text="Remove from queue"
            onClick={onDequeue}
            data-testid="dequeue-button"
            isLoader={isInProgress && action === QueueActions.Dequeue}            
            disabled={
              (isInProgress && action !== QueueActions.Dequeue) ||
              step.every((element) => element.value === undefined)
            }
          />          
          <Button
            type="button"
            text="Clear queue"
            onClick={onClear}
            data-testid="clear-button"
            isLoader={isInProgress && action === QueueActions.Clear}            
            disabled={
              (isInProgress && action !== QueueActions.Clear) ||
              step.every((element) => element.value === undefined)
            }
            extraClass={styles.leftMargin}
          />                    
        </form>
        {content}
      </section>            
    </SolutionLayout>
  );
};
