// libraries 
import { ChangeEvent, FC, FormEvent, useCallback, useMemo, useState } from "react";

// components 
import { Button, Column, Input, RadioInput, SolutionLayout } from "../../ui";

// styles 
import styles from "./sorting.module.css";

// utils
import { ElementData } from "../../utils/element-data";
import { DEFAULT_ARRAY_SIZE, Direction, SortingAlgorithms } from "../../utils/constants";

// algorithms 
import { bubbleSort } from "../../algorithms/sorting/bubble-sort";
import { selectionSort } from "../../algorithms/sorting/selection-sort";
import useForm from "../../hooks/use-form";



export const SortingPage: FC = () => {
  
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(true);  
  const { onChange } = useForm();
  
  const getRandomArray = useCallback(
    () => Array.from(
      { length: Number(inputValue) || DEFAULT_ARRAY_SIZE }, 
      () => new ElementData(
        Math.floor(1 + Math.random() * 100)
      )
    ),
    [inputValue]
  );
  
  const [algorithm, setAlgorithm] = useState(SortingAlgorithms.Selection);
  const [isInProgress, setIsInProgress] = useState(false);  
  const [currentArray, setCurrentArray] = useState(getRandomArray());
  
  const changeAlgorithm = (event: ChangeEvent<HTMLInputElement>): void => {
    setAlgorithm(event.target.value as SortingAlgorithms);
  };  
  
  const sortArray = (direction: Direction) => async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    setIsInProgress(true);
    if (algorithm === SortingAlgorithms.Selection) {
      await selectionSort(currentArray, setCurrentArray, direction);
    } else if (algorithm === SortingAlgorithms.Bubble) {
      await bubbleSort(currentArray, setCurrentArray, direction);
    }; 
    setIsInProgress(false);
  };
  
  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();
    setCurrentArray(getRandomArray());
  };
  
  const content = useMemo(
    () => {
      return (
        <ul className={styles.list}>
          {
            currentArray.map(
              ({value, state}, index) => {
                return (
                  <li className={styles.item} key={index}>
                    <Column 
                      value={value}
                      state={state}
                    />
                  </li>
                )
              }
            )
          }
        </ul>
      );
    },
    [currentArray]
  );    
  
  return (
    <SolutionLayout title="Сортировка массива">
      <section className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit}>
          <RadioInput
            label="Выбор"
            value={SortingAlgorithms.Selection}
            checked={algorithm === SortingAlgorithms.Selection}
            onChange={changeAlgorithm}            
          />
          <RadioInput
            label="Пузырёк"
            value={SortingAlgorithms.Bubble}
            checked={algorithm === SortingAlgorithms.Bubble}
            onChange={changeAlgorithm}            
            extraClass={styles.smallLeftMargin}
          />          
          <Button
            sorting={Direction.Ascending}
            text="По возрастанию"
            isLoader={isInProgress}
            extraClass={styles.mediumLeftMargin}
            onClick={sortArray(Direction.Ascending)}
          />
          <Button
            sorting={Direction.Descending}
            text="По убыванию"
            isLoader={isInProgress}
            onClick={sortArray(Direction.Descending)}
          />      
          <Button
            type="submit"
            text="Новый массив"
            isLoader={isInProgress}
            disabled={!isInputValid}
            extraClass={styles.largeLeftMargin}
          />               
          <Input 
            type="number"          
            placeholder="число элементов"
            min={3}
            max={17}
            value={inputValue}
            onChange={onChange(setInputValue, setIsInputValid)}
            extraClass={styles.exactWidth}
          />          
        </form>
        {content}
      </section>            
    </SolutionLayout>
  );
};
