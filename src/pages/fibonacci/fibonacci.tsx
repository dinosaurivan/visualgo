// libraries
import { FC, FormEvent, useMemo, useState } from "react";

// components 
import { Button, Circle, Input, SolutionLayout } from "../../ui";

// styles
import styles from "./fibonacci.module.css";

// hooks
import useForm from "../../hooks/use-form";

// utils
import { ElementData } from "../../utils/element-data";

// algorithms
import { fibonacciSequence } from "../../algorithms/fibonacci-sequence";



export const FibonacciPage: FC = () => {
  
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const { onChange } = useForm();
  
  const [isInProgress, setIsInProgress] = useState(false);
  const [currentSequenceState, setCurrentSequenceState] = useState<Array<ElementData<number>>>([]);
  
  const onSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    setIsInProgress(true);
    await fibonacciSequence(Number(inputValue), setCurrentSequenceState);
    setInputValue("");
    setIsInProgress(false);
  };
  
  const content = useMemo(
    () => {
      return (
        <ul className={styles.list}>
          {
            currentSequenceState.map(
              ({state, value}, index) => (
                <li className={styles.item} key={index}>
                  <Circle 
                    state={state}
                    value={String(value)}
                    index={index}
                  />
                </li>
              )
            )
          }
        </ul>
      );
    },
    [currentSequenceState]
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
            onChange={onChange(setInputValue, setIsInputValid)}
          />
          <Button
            text="Рассчитать"
            disabled={!isInputValid || inputValue.length === 0}
            type="submit"
            isLoader={isInProgress}
          />
        </form>
        {content}
      </section>      
    </SolutionLayout>
  );
};
