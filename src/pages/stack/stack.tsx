// libraries
import { FC, FormEvent, useEffect, useMemo, useState } from "react";

// components 
import { Button, Circle, Input, SolutionLayout } from "../../ui";

// styles
import styles from "./stack.module.css";

// hooks
import useForm from "../../hooks/use-form";

// utils
import { ElementData } from "../../utils/element-data";
import { sequentialUpdate } from "../../utils/sequential-update";
import { ElementCaptions, MAX_ELEMENT_LENGTH, StackActions } from "../../utils/constants";

// data structures 
import { Stack } from "../../data-structures/stack";



export const StackPage: FC = () => {
  
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const { onChange } = useForm();
  
  const [action, setAction] = useState(StackActions.Push);
  const [isInProgress, setIsInProgress] = useState(false);
  
  const [state, setState] = useState<Array<ElementData<string>>>([]);
  const [history, setHistory] = useState<Array<typeof state>>([]);
  
  const onSubmit = (action: StackActions) => async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const stack = new Stack<string>(state);
    if (action === StackActions.Push) {
      setHistory(stack.push(inputValue));
    } else if (action === StackActions.Pop) {
      setHistory(stack.pop());
    } else if (action === StackActions.Clear) {
      setHistory(stack.clear());
    };
    setInputValue("");
    setIsInputValid(false);
  };  
  
  useEffect(
    () => {
      let isMounted = true;
      if (history.length > 0) {
        setIsInProgress(true);
        sequentialUpdate<string>(history, setState, setIsInProgress, () => isMounted);
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
            ({value, color, isHead}, index) => (
              <li className={styles.item} key={index}>
                <Circle 
                  value={value}
                  color={color}
                  index={index}
                  above={isHead ? ElementCaptions.Top : undefined}
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
    <SolutionLayout title="Стек">
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
            disabled={!isInputValid || (isInProgress && action !== StackActions.Push)}
            isLoader={isInProgress && action === StackActions.Push}            
            onClick={() => { setAction(StackActions.Push); }}
          />
          <Button
            type="submit"
            text="Удалить"
            disabled={state.length === 0 || (isInProgress && action !== StackActions.Pop)}
            isLoader={isInProgress && action === StackActions.Pop}            
            onClick={() => { setAction(StackActions.Pop); }}
          />          
          <Button
            type="submit"
            text="Очистить"
            disabled={state.length === 0 || (isInProgress && action !== StackActions.Clear)}
            isLoader={isInProgress && action === StackActions.Clear}            
            onClick={() => { setAction(StackActions.Clear); }}
            extraClass={styles.leftMargin}
          />                    
        </form>
        {content}
      </section>            
    </SolutionLayout>
  );
};
