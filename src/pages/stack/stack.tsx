// libraries
import React, { JSX, FormEventHandler, MouseEventHandler, useEffect, useMemo, useState } from "react";

// components 
import { Button, Circle, Input, SolutionLayout } from "../../ui";

// styles
import styles from "./stack.module.css";

// hooks
import useForm from "../../hooks/use-form";

// utils
import ElementData from "../../utils/element-data";
import sequentialUpdate from "../../utils/sequential-update";
import { ElementCaptions, MAX_ELEMENT_LENGTH, StackActions } from "../../utils/constants";

// data structures 
import { Stack } from "../../data-structures";



export default function StackPage(): JSX.Element {
  
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const { onChange } = useForm();
  
  const [action, setAction] = useState(StackActions.Push);
  const [isInProgress, setIsInProgress] = useState(false);
  
  const [step, setStep] = useState<Array<ElementData<string>>>([]);
  const [steps, setSteps] = useState<Array<typeof step>>([]);
  
  const onPush: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setAction(StackActions.Push);
    const stack = new Stack<string>(step);
    setSteps(stack.getPushSteps(inputValue));
    setInputValue("");
    setIsInputValid(false);
  };  
  
  const onPop: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    setAction(StackActions.Pop);
    const stack = new Stack<string>(step);
    setSteps(stack.getPopSteps());
  };  
  
  const onClear: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    setAction(StackActions.Clear);
    const stack = new Stack<string>(step);
    setSteps(stack.getClearSteps());
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
    <SolutionLayout title="Stack">
      <section className={styles.container} data-testid="stack-page">
        <form className={styles.form} onSubmit={onPush} data-testid="form">
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
            text="Push to stack"
            data-testid="push-button"
            disabled={!isInputValid || (isInProgress && action !== StackActions.Push)}
            isLoader={isInProgress && action === StackActions.Push}            
          />
          <Button
            type="button"
            text="Pop from stack"
            onClick={onPop}
            data-testid="pop-button"
            disabled={step.length === 0 || (isInProgress && action !== StackActions.Pop)}
            isLoader={isInProgress && action === StackActions.Pop}            
          />          
          <Button
            type="button"
            text="Clear stack"
            onClick={onClear}
            data-testid="clear-button"
            disabled={step.length === 0 || (isInProgress && action !== StackActions.Clear)}
            isLoader={isInProgress && action === StackActions.Clear}            
            extraClass={styles.leftMargin}
          />                    
        </form>
        {content}
      </section>            
    </SolutionLayout>
  );
};
