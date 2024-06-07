// libraries
import React, { FC, FormEvent, useEffect, useMemo, useState } from "react";

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
import { Stack } from "../../data-structures";



export const StackPage: FC = () => {
  
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const { onChange } = useForm();
  
  const [action, setAction] = useState(StackActions.Push);
  const [isInProgress, setIsInProgress] = useState(false);
  
  const [step, setStep] = useState<Array<ElementData<string>>>([]);
  const [steps, setSteps] = useState<Array<typeof step>>([]);
  
  const onSubmit = (action: StackActions) => async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const stack = new Stack<string>(step);
    if (action === StackActions.Push) {
      setSteps(stack.getPushSteps(inputValue));
    } else if (action === StackActions.Pop) {
      setSteps(stack.getPopSteps());
    } else if (action === StackActions.Clear) {
      setSteps(stack.clearSteps());
    };
    setInputValue("");
    setIsInputValid(false);
  };  
  
  useEffect(
    () => {
      let isMounted = true;
      if (steps.length > 0) {
        setIsInProgress(true);
        sequentialUpdate<string>(steps, setStep, setIsInProgress, () => isMounted);
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
    [step]
  );
  
  return (
    <SolutionLayout title="Стек">
      <section className={styles.container} data-testid="stack-page">
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
            disabled={step.length === 0 || (isInProgress && action !== StackActions.Pop)}
            isLoader={isInProgress && action === StackActions.Pop}            
            onClick={() => { setAction(StackActions.Pop); }}
          />          
          <Button
            type="submit"
            text="Очистить"
            disabled={step.length === 0 || (isInProgress && action !== StackActions.Clear)}
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
