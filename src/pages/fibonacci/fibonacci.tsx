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
import { sequentialUpdate } from "../../utils/sequential-update";

// data structures 
import { FibonacciSequence } from "../../data-structures/fibonacci-sequence";



export const FibonacciPage: FC = () => {
  
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const { onChange } = useForm();
  
  const [isInProgress, setIsInProgress] = useState(false);
  
  const [state, setState] = useState<Array<ElementData<number>>>([]);
  const [history, setHistory] = useState<Array<typeof state>>([]);
  
  const onSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    const sequence = new FibonacciSequence();
    setHistory(sequence.calculate(Number(inputValue)));
    setInputValue("");    
    setIsInputValid(false);
  };
  
  useEffect(
    () => {
      let isMounted = true;
      if (history.length > 0) {
        setIsInProgress(true);
        sequentialUpdate<number>(history, setState, setIsInProgress, () => isMounted);
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
    [state]
  );  
  
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <section className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit}>
          <Input 
            type="number"          
            min={0}
            max={19}
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
