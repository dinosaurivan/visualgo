// libraries
import { FC, FormEvent, useState } from "react";

// components 
import { Button, Input, SolutionLayout } from "../../ui";

// styles
import styles from "./list.module.css";

// hooks
import useForm from "../../hooks/use-form";

// utils
import { Delay, LinkedListActions } from "../../utils/constants";

import { sleep } from "../../helpers/sleep";



export const ListPage: FC = () => {
  
  const [valueInput, setValueInput] = useState("");
  const [indexInput, setIndexInput] = useState("");
  const [isValueValid, setIsValueValid] = useState(false);
  const [isIndexValid, setIsIndexValid] = useState(false);
  const { onChange } = useForm();
  
  const [action, setAction] = useState(LinkedListActions.Insert);
  const [isInProgress, setIsInProgress] = useState(false);
  
  const onSubmit = (action: LinkedListActions) => async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsInProgress(true);
    await sleep(Delay.Medium);
    setValueInput("");
    setIndexInput("");
    setIsInProgress(false);
  };
  
  return (
    <SolutionLayout title="Связный список">
      <section className={styles.container}>
        <div className={styles.forms}>
          <form className={styles.form} onSubmit={onSubmit(action)}>
            <Input 
              maxLength={4}
              isLimitText={true}     
              value={valueInput}
              placeholder="Введите значение"
              onChange={onChange(setValueInput, setIsValueValid)}
            />
            <Button
              type="submit"
              text="Добавить в head"
              disabled={false}
              isLoader={false}              
              onClick={() => { setAction(LinkedListActions.Unshift); }}
            />
            <Button
              type="submit"
              text="Добавить в tail"
              disabled={false}
              isLoader={false}              
              onClick={() => { setAction(LinkedListActions.Push); }}
            />
            <Button
              type="submit"
              text="Удалить из head"
              disabled={false}
              isLoader={false}              
              onClick={() => { setAction(LinkedListActions.Shift); }}
            />          
            <Button
              type="submit"
              text="Удалить из tail"
              disabled={false}
              isLoader={false}              
              onClick={() => { setAction(LinkedListActions.Pop); }}
            />        
          </form>
          <form className={`${styles.form} ${styles.threeColumns}`} onSubmit={onSubmit(action)}>
            <Input 
              type="number"
              min={0}
              // todo max
              value={indexInput}
              placeholder="Введите индекс"
              onChange={onChange(setIndexInput, setIsIndexValid)}
            />
            <Button
              type="submit"
              text="Добавить по индексу"
              disabled={false}
              isLoader={false}                     
              onClick={() => { setAction(LinkedListActions.Insert); }}
            />
            <Button
              type="submit"
              text="Удалить по индексу"
              disabled={false}
              isLoader={false}                     
              onClick={() => { setAction(LinkedListActions.Remove); }}
            />             
          </form>  
        </div>
        
      </section>          
    </SolutionLayout>
  );
};
