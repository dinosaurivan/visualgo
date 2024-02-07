// libraries
import { FC, FormEvent, useState } from "react";

// components 
import { Button, Input, SolutionLayout } from "../../ui";

// styles
import styles from "./stack.module.css";

// hooks
import useForm from "../../hooks/use-form";

// utils
import { Delay, StackActions } from "../../utils/constants";
import { sleep } from "../../helpers/sleep";



export const StackPage: FC = () => {
  
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const { onChange } = useForm();
  
  const [action, setAction] = useState(StackActions.Push);
  const [isInProgress, setIsInProgress] = useState(false);
  
  const onSubmit = (action: StackActions) => async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsInProgress(true);
    await sleep(Delay.Medium);
    setInputValue("");
    setIsInProgress(false);
  };  
  
  return (
    <SolutionLayout title="Стек">
      <section className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit(action)}>
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
            disabled={false}
            isLoader={false}            
            onClick={() => { setAction(StackActions.Push); }}
          />
          <Button
            type="submit"
            text="Удалить"
            disabled={false}
            isLoader={false}               
            onClick={() => { setAction(StackActions.Pop); }}
          />          
          <Button
            type="submit"
            text="Очистить"
            disabled={false}
            isLoader={false}               
            onClick={() => { setAction(StackActions.Clear); }}
            extraClass={styles.leftMargin}
          />                    
        </form>
        
      </section>            
    </SolutionLayout>
  );
};
