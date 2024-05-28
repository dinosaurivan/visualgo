// libraries 
import { ChangeEvent, FC, FormEvent, useEffect, useMemo, useState } from "react";

// components 
import { Button, Column, Input, RadioInput, SolutionLayout } from "../../ui";

// styles 
import styles from "./sorting.module.css";

// hooks 
import useForm from "../../hooks/use-form";

// utils
import { ElementData } from "../../utils/element-data";
import { randomNumbersArray } from "../../utils/random-array";
import { sequentialUpdate } from "../../utils/sequential-update";
import { DEFAULT_ARRAY_SIZE, Direction, MAX_ARRAY_SIZE, MIN_ARRAY_SIZE, SortingActions } from "../../utils/constants";

// data structures 
import { NumbersArray } from "../../data-structures";



export const SortingPage: FC = () => {
  
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(true);  
  const { onChange } = useForm();
  
  const [action, setAction] = useState(SortingActions.Selection);
  const [direction, setDirection] = useState(Direction.Ascending);
  const [isInProgress, setIsInProgress] = useState(false);  
  
  const changeAlgorithm = (event: ChangeEvent<HTMLInputElement>): void => {
    setAction(event.target.value as SortingActions);
  };    
  
  const [step, setStep] = useState<Array<ElementData<number>>>(randomNumbersArray(Number(inputValue)));
  const [steps, setSteps] = useState<Array<typeof step>>([]);
  
  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();
    const numbersArray = new NumbersArray(step);
    if (action === SortingActions.Bubble) {
      setSteps(numbersArray.getBubbleSortSteps(direction));
    } else if (action === SortingActions.Selection) {
      setSteps(numbersArray.getSelectionSortSteps(direction));
    };
  };
  
  const onReset = (event: FormEvent): void => {
    event.preventDefault();
    const numbersArray = new NumbersArray(step);
    setSteps(numbersArray.getRefreshSteps(Number(inputValue) || DEFAULT_ARRAY_SIZE));
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
                <Column 
                  value={value}
                  color={color}
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
    <SolutionLayout title="Сортировка массива">
      <section className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
          <RadioInput
            label="Выбор"
            value={SortingActions.Selection}
            checked={action === SortingActions.Selection}
            onChange={changeAlgorithm}            
          />
          <RadioInput
            label="Пузырёк"
            value={SortingActions.Bubble}
            checked={action === SortingActions.Bubble}
            onChange={changeAlgorithm}            
            extraClass={styles.smallLeftMargin}
          />          
          <Button
            type="submit"
            sorting={Direction.Ascending}
            text="По возрастанию"
            disabled={isInProgress && direction !== Direction.Ascending}
            isLoader={isInProgress && direction === Direction.Ascending}            
            onClick={() => { setDirection(Direction.Ascending); }}
            extraClass={styles.mediumLeftMargin}
          />
          <Button
            type="submit"
            sorting={Direction.Descending}
            text="По убыванию"
            disabled={isInProgress && direction !== Direction.Descending}
            isLoader={isInProgress && direction === Direction.Descending}            
            onClick={() => { setDirection(Direction.Descending); }}
          />      
          <Button
            type="reset"
            text="Новый массив"
            disabled={!isInputValid || isInProgress}
            extraClass={styles.largeLeftMargin}
          />               
          <Input 
            type="number"          
            placeholder="число элементов"
            min={MIN_ARRAY_SIZE}
            max={MAX_ARRAY_SIZE}
            value={inputValue}
            onChange={onChange(setInputValue, setIsInputValid, true)}
            extraClass={styles.exactWidth}
          />          
        </form>
        {content}
      </section>            
    </SolutionLayout>
  );
};
