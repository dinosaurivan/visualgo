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
import { ElementCaptions, ElementColors, LinkedListActions } from "../../utils/constants";

// data structures 
import { LinkedList } from "../../data-structures/linked-list";



export const LinkedListPage: FC = () => {
  
  const [valueInput, setValueInput] = useState("");
  const [indexInput, setIndexInput] = useState("");
  const [isValueValid, setIsValueValid] = useState(false);
  const [isIndexValid, setIsIndexValid] = useState(false);
  const { onChange } = useForm();
  
  const [action, setAction] = useState(LinkedListActions.Insert);
  const [isInProgress, setIsInProgress] = useState(false);
  
  const [state, setState] = useState<Array<ElementData<string | undefined>>>(randomStringsArray());
  const [history, setHistory] = useState<Array<typeof state>>([]);
  
  const onSubmit = (action: LinkedListActions) => async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const linkedList = new LinkedList<string | undefined>(state);
    if (action === LinkedListActions.Unshift) {
      setHistory(linkedList.unshift(valueInput));
    } else if (action === LinkedListActions.Push) {
      setHistory(linkedList.push(valueInput));
    } else if (action === LinkedListActions.Shift) {
      setHistory(linkedList.shift());
    } else if (action === LinkedListActions.Pop) {
      setHistory(linkedList.pop());
    } else if (action === LinkedListActions.Insert) {
      setHistory(linkedList.insert(valueInput, Number(indexInput)));
    } else if (action === LinkedListActions.Remove) {
      setHistory(linkedList.remove(Number(indexInput)));
    };
    setValueInput("");
    setIndexInput("");
    setIsValueValid(false);
    setIsIndexValid(false);
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
          state.map(
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
    [state, supportiveContent]
  );    
  
  return (
    <SolutionLayout title="Связный список">
      <section className={styles.container}>
        <div className={styles.forms}>
          <form className={styles.form} onSubmit={onSubmit(action)}>
            <Input 
              maxLength={4}
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
              disabled={state.length === 0 || (isInProgress && action !== LinkedListActions.Shift)}
              isLoader={isInProgress && action === LinkedListActions.Shift}              
              onClick={() => { setAction(LinkedListActions.Shift); }}
            />          
            <Button
              type="submit"
              text="Удалить из tail"
              disabled={state.length === 0 || (isInProgress && action !== LinkedListActions.Pop)}
              isLoader={isInProgress && action === LinkedListActions.Pop}              
              onClick={() => { setAction(LinkedListActions.Pop); }}
            />        
          </form>
          <form className={`${styles.form} ${styles.threeColumns}`} onSubmit={onSubmit(action)}>
            <Input 
              type="number"
              min={0}
              max={state.length}
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
              disabled={!isIndexValid || Number(indexInput) >= state.length || (isInProgress && action !== LinkedListActions.Remove)}
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
