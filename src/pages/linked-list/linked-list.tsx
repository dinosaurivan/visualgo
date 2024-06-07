// libraries
import { FC, FormEvent, Fragment, useCallback, useEffect, useMemo, useState } from "react";

// components 
import { ArrowIcon, Button, Circle, Input, SolutionLayout } from "../../ui";

// styles
import styles from "./linked-list.module.css";

// hooks
import useForm from "../../hooks/use-form";

// utils
import { ElementData } from "../../utils/element-data";
import { randomStringsArray } from "../../utils/random-array";
import { sequentialUpdate } from "../../utils/sequential-update";
import { ElementCaptions, ElementColors, LinkedListActions, MAX_ELEMENT_LENGTH } from "../../utils/constants";

// data structures 
import { LinkedList } from "../../data-structures";



export const LinkedListPage: FC = () => {
  
  const [valueInput, setValueInput] = useState("");
  const [indexInput, setIndexInput] = useState("");
  const [isValueValid, setIsValueValid] = useState(false);
  const [isIndexValid, setIsIndexValid] = useState(false);
  const { onChange } = useForm();
  
  const [action, setAction] = useState(LinkedListActions.Insert);
  const [isInProgress, setIsInProgress] = useState(false);
  
  const [step, setStep] = useState<Array<ElementData<string | undefined>>>(randomStringsArray());
  const [steps, setSteps] = useState<Array<typeof step>>([]);
  
  const onSubmit = (action: LinkedListActions) => async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const linkedList = new LinkedList<string | undefined>(step);
    if (action === LinkedListActions.Unshift) {
      setSteps(linkedList.getUnshiftSteps(valueInput));
    } else if (action === LinkedListActions.Push) {
      setSteps(linkedList.getPushSteps(valueInput));
    } else if (action === LinkedListActions.Shift) {
      setSteps(linkedList.getShiftSteps());
    } else if (action === LinkedListActions.Pop) {
      setSteps(linkedList.getPopSteps());
    } else if (action === LinkedListActions.Insert) {
      setSteps(linkedList.getInsertionSteps(valueInput, Number(indexInput)));
    } else if (action === LinkedListActions.Remove) {
      setSteps(linkedList.getRemovalSteps(Number(indexInput)));
    };
    setValueInput("");
    setIndexInput("");
    setIsValueValid(false);
    setIsIndexValid(false);
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
  
  const supportiveContent = useCallback(
    (value: string | undefined, needsCaption: boolean, caption: string) => (
      value !== undefined
      ? <Circle isSmall={true} value={value} color={ElementColors.Changing} />
      : (needsCaption ? caption : undefined)
    ),
    []
  );
  
  const content = useMemo(
    () => (
      <ul className={styles.list}>
        {
          step.map(
            ({value, color, isHead, isTail, valueAbove, valueBelow}, index, array) => (
              <Fragment key={index}>
                <li className={styles.item}>
                  <Circle
                    value={value}
                    color={color}
                    index={index}
                    above={supportiveContent(valueAbove, isHead, ElementCaptions.Head)}
                    below={supportiveContent(valueBelow, isTail, ElementCaptions.Tail)}
                  />
                </li> 
                {index < array.length-1 && <ArrowIcon />}
              </Fragment>
            )
          )
        }
      </ul>
    ),
    [step, supportiveContent]
  );    
  
  return (
    <SolutionLayout title="Связный список">
      <section className={styles.container} data-testid="linked-list-page">
        <div className={styles.forms}>
          <form className={styles.form} onSubmit={onSubmit(action)}>
            <Input 
              maxLength={MAX_ELEMENT_LENGTH}
              isLimitText={true}     
              value={valueInput}
              placeholder="Введите значение"
              onChange={onChange(setValueInput, setIsValueValid, false)}
            />
            <Button
              type="submit"
              text="Добавить в head"
            disabled={!isValueValid || (isInProgress && action !== LinkedListActions.Unshift)}
            isLoader={isInProgress && action === LinkedListActions.Unshift}            
              onClick={() => { setAction(LinkedListActions.Unshift); }}
            />
            <Button
              type="submit"
              text="Добавить в tail"
            disabled={!isValueValid || (isInProgress && action !== LinkedListActions.Push)}
            isLoader={isInProgress && action === LinkedListActions.Push}            
              onClick={() => { setAction(LinkedListActions.Push); }}
            />
            <Button
              type="submit"
              text="Удалить из head"
              disabled={step.length === 0 || (isInProgress && action !== LinkedListActions.Shift)}
              isLoader={isInProgress && action === LinkedListActions.Shift}              
              onClick={() => { setAction(LinkedListActions.Shift); }}
            />          
            <Button
              type="submit"
              text="Удалить из tail"
              disabled={step.length === 0 || (isInProgress && action !== LinkedListActions.Pop)}
              isLoader={isInProgress && action === LinkedListActions.Pop}              
              onClick={() => { setAction(LinkedListActions.Pop); }}
            />        
          </form>
          <form className={`${styles.form} ${styles.threeColumns}`} onSubmit={onSubmit(action)}>
            <Input 
              type="number"
              min={0}
              max={step.length}
              value={indexInput}
              placeholder="Введите индекс"
              onChange={onChange(setIndexInput, setIsIndexValid, false)}
            />
            <Button
              type="submit"
              text="Добавить по индексу"
              disabled={!isValueValid || !isIndexValid || (isInProgress && action !== LinkedListActions.Insert)}
              isLoader={isInProgress && action === LinkedListActions.Insert}            
              onClick={() => { setAction(LinkedListActions.Insert); }}
            />
            <Button
              type="submit"
              text="Удалить по индексу"
              disabled={!isIndexValid || Number(indexInput) >= step.length || (isInProgress && action !== LinkedListActions.Remove)}
              isLoader={isInProgress && action === LinkedListActions.Remove}            
              onClick={() => { setAction(LinkedListActions.Remove); }}
            />             
          </form>  
        </div>
        {content}
      </section>          
    </SolutionLayout>
  );
};
