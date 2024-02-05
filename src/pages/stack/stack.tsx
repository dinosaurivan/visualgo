// libraries
import { FC, FormEvent, useMemo, useState } from "react";

// components 
import { Button, Circle, Input, SolutionLayout } from "../../ui";

// styles
import styles from "./stack.module.css";

// hooks
import useForm from "../../hooks/use-form";

// utils
import { ElementCaptions, StackActions } from "../../utils/constants";
import { ElementData } from "../../utils/element-data";

// algorithms 
import { pushToStack } from "../../algorithms/stack/push-to-stack";
import { popFromStack } from "../../algorithms/stack/pop-from-stack";



export const StackPage: FC = () => {
  
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const { onChange } = useForm();
  
  const [action, setAction] = useState(StackActions.Push);
  const [isInProgress, setIsInProgress] = useState(false);
  const [currentStackState, setCurrentStackState] = useState<Array<ElementData<string>>>([]);
  
  const onSubmit = (action: StackActions) => async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsInProgress(true);
    if (action === StackActions.Push) {
      await pushToStack(inputValue, currentStackState, setCurrentStackState);
    } else if (action === StackActions.Pop) {
      await popFromStack(currentStackState, setCurrentStackState);
    };
    setInputValue("");
    setIsInProgress(false);
  };  
  
  const onReset = (event: FormEvent): void => {
    event.preventDefault();
    setCurrentStackState([]);
  };
  
  const content = useMemo(
    () => {
      return (
        <ul className={styles.list}>
          {
            currentStackState.map(
              ({state, value, isHead}, index) => {
                return (
                  <li className={styles.item} key={index}>
                    <Circle 
                      state={state}
                      value={value}
                      index={index}
                      above={isHead ? ElementCaptions.Top : undefined}
                    />
                  </li>
                )
              }
            )
          }
        </ul>
      );
    },
    [currentStackState]
  );  
  
  return (
    <SolutionLayout title="Стек">
      <section className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit(action)} onReset={onReset}>
          <Input 
            maxLength={4}
            isLimitText={true}     
            value={inputValue}
            placeholder="Введите значение"
            onChange={onChange(setInputValue, setIsInputValid)}
          />
          <Button
            type="submit"
            text="Добавить"
            disabled={!isInputValid || inputValue.length === 0}
            isLoader={isInProgress}
            onClick={() => { setAction(StackActions.Push); }}
          />
          <Button
            type="submit"
            text="Удалить"
            disabled={currentStackState.length === 0}
            isLoader={isInProgress}
            onClick={() => { setAction(StackActions.Pop); }}
          />          
          <Button
            type="reset"
            text="Очистить"
            disabled={currentStackState.length === 0}
            isLoader={isInProgress}
            extraClass={styles.leftMargin}
          />                    
        </form>
        {content}
      </section>            
    </SolutionLayout>
  );
};
