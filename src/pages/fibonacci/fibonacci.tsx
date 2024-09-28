// libraries
import React, { JSX, FormEvent, useEffect, useMemo, useState } from "react";

// components 
import { Button, Circle, Input, SolutionLayout } from "../../ui";

// styles
import styles from "./fibonacci.module.css";

// hooks
import useForm from "../../hooks/use-form";

// utils
import ElementData from "../../utils/element-data";
import { MAX_FIBONACCI_LENGTH } from "../../utils/constants";
import sequentialUpdate from "../../utils/sequential-update";

// data structures 
import { FibonacciSequence } from "../../data-structures";



export default function FibonacciPage(): JSX.Element {
  
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const { onChange } = useForm();
  
  const [isInProgress, setIsInProgress] = useState(false);
  
  const [step, setStep] = useState<Array<ElementData<number>>>([]);
  const [steps, setSteps] = useState<Array<typeof step>>([]);
  
  const onSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    const sequence = new FibonacciSequence();
    setSteps(sequence.getCalculationSteps(Number(inputValue)));
    setInputValue("");    
    setIsInputValid(false);
  };
  
  useEffect(
    () => {
      let isMounted = true;
      if (steps.length > 0) {
        setIsInProgress(true);
        sequentialUpdate<number>(steps, setStep, setIsInProgress, () => isMounted);
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
            ({value, color}, index) => (
              <li className={styles.item} key={index}>
                <Circle 
                  value={String(value)}
                  color={color}
                  index={index}
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
    <SolutionLayout title="Fibonacci Sequence">
      <section className={styles.container} data-testid="fibonacci-page">
        <form className={styles.form} onSubmit={onSubmit} data-testid="form">
          <Input 
            type="number"          
            min={0}
            max={MAX_FIBONACCI_LENGTH}
            isLimitText={true}     
            value={inputValue}
            data-testid="input"
            onChange={onChange(setInputValue, setIsInputValid, false)}
          />
          <Button
            type="submit"
            text="Calculate Sequence"
            data-testid="calculate-button"
            disabled={!isInputValid}
            isLoader={isInProgress}
          />
        </form>
        {content}
      </section>      
    </SolutionLayout>
  );
};
