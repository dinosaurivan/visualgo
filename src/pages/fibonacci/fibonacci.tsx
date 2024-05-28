// libraries
import { FC, FormEvent, useEffect, useMemo, useState } from "react";

// components 
import { Button, Circle, Input, SolutionLayout } from "../../ui";

// styles
import styles from "./fibonacci.module.css";

// hooks
import useForm from "../../hooks/use-form";

// utils
import { ElementData } from "../../utils/element-data";
import { MAX_FIBONACCI_LENGTH } from "../../utils/constants";
import { sequentialUpdate } from "../../utils/sequential-update";

// data structures 
import { FibonacciSequence } from "../../data-structures/fibonacci-sequence";



export const FibonacciPage: FC = () => {
  
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
    <SolutionLayout title="Последовательность Фибоначчи">
      <section className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit}>
          <Input 
            type="number"          
            min={0}
            max={MAX_FIBONACCI_LENGTH}
            isLimitText={true}     
            value={inputValue}
            onChange={onChange(setInputValue, setIsInputValid, false)}
          />
          <Button
            type="submit"
            text="Рассчитать"
            disabled={!isInputValid}
            isLoader={isInProgress}
          />
        </form>
        {content}
      </section>      
    </SolutionLayout>
  );
};
