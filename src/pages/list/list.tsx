// libraries
import { FC, FormEvent, Fragment, useMemo, useState } from "react";

// components 
import { ArrowIcon, Button, Circle, Input, SolutionLayout } from "../../ui";

// styles
import styles from "./list.module.css";

// hooks
import useForm from "../../hooks/use-form";

// utils
import { ElementData } from "../../utils/element-data";
import { ElementCaptions, ElementStates, LinkedListActions } from "../../utils/constants";

// algorithms
import { insertToList } from "../../algorithms/list/insert-to-list";
import { removeFromList } from "../../algorithms/list/remove-from-list";



export const ListPage: FC = () => {
  
  const [valueInput, setValueInput] = useState("");
  const [indexInput, setIndexInput] = useState("");
  const [isValueValid, setIsValueValid] = useState(false);
  const [isIndexValid, setIsIndexValid] = useState(false);
  const { onChange } = useForm();
  
  const initialList = useMemo(
    () => [
      new ElementData("69", ElementStates.Default, true),
      new ElementData("420"),
      new ElementData("21"),
      new ElementData("666", ElementStates.Default, false, true),     
    ],
    []
  );
  
  const [action, setAction] = useState(LinkedListActions.Insert);
  const [isInProgress, setIsInProgress] = useState(false);
  const [currentListState, setCurrentListState] = useState(initialList);
  
  const onSubmit = (action: LinkedListActions) => async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsInProgress(true);
    if (action === LinkedListActions.Push) {
      await insertToList(valueInput, currentListState.length, currentListState, setCurrentListState);
    } else if (action === LinkedListActions.Pop) {
      await removeFromList(currentListState.length-1, currentListState, setCurrentListState);
    } else if (action === LinkedListActions.Unshift) {
      await insertToList(valueInput, 0, currentListState, setCurrentListState);
    } else if (action === LinkedListActions.Shift) {
      await removeFromList(0, currentListState, setCurrentListState);
    } else if (action === LinkedListActions.Insert) {
      await insertToList(valueInput, Number(indexInput), currentListState, setCurrentListState);
    } else if (action === LinkedListActions.Remove) {
      await removeFromList(Number(indexInput), currentListState, setCurrentListState);
    };
    setValueInput("");
    setIndexInput("");
    setIsInProgress(false);
  };
  
  const content = useMemo(
    () => {
      return (
        <ul className={styles.list}>
          {
            currentListState.map(
              ({state, value, isHead, isTail, valueAbove, valueBelow}, index, array) => {
                const above = valueAbove 
                              ? <Circle state={ElementStates.Changing} value={valueAbove} isSmall={true} />
                              : (isHead ? ElementCaptions.Head : undefined)
                const below = valueBelow 
                              ? <Circle state={ElementStates.Changing} value={valueBelow} isSmall={true} />
                              : (isTail ? ElementCaptions.Tail : undefined)                              
                return (
                  <Fragment key={index}>
                    <li className={styles.item}>
                      <Circle
                        state={state}
                        value={value}
                        index={index}
                        above={above}
                        below={below}
                      />
                    </li> 
                    {index < array.length-1 && <ArrowIcon />}
                  </Fragment>
                )
              }
            )
          }
        </ul>
      );
    },
    [currentListState]
  );   
  
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
              disabled={!isValueValid || valueInput.length === 0}
              isLoader={isInProgress}
              onClick={() => { setAction(LinkedListActions.Unshift); }}
            />
            <Button
              type="submit"
              text="Добавить в tail"
              disabled={!isValueValid || valueInput.length === 0}
              isLoader={isInProgress}
              onClick={() => { setAction(LinkedListActions.Push); }}
            />
            <Button
              type="submit"
              text="Удалить из head"
              disabled={currentListState.length === 0}
              isLoader={isInProgress}
              onClick={() => { setAction(LinkedListActions.Shift); }}
            />          
            <Button
              type="submit"
              text="Удалить из tail"
              disabled={currentListState.length === 0}
              isLoader={isInProgress}
              onClick={() => { setAction(LinkedListActions.Pop); }}
            />        
          </form>
          <form className={`${styles.form} ${styles.threeColumns}`} onSubmit={onSubmit(action)}>
            <Input 
              type="number"
              min={0}
              max={currentListState.length}
              value={indexInput}
              placeholder="Введите индекс"
              onChange={onChange(setIndexInput, setIsIndexValid)}
            />
            <Button
              type="submit"
              text="Добавить по индексу"
              disabled={!isIndexValid || !isValueValid || indexInput.length === 0 || valueInput.length === 0}
              isLoader={isInProgress}
              onClick={() => { setAction(LinkedListActions.Insert); }}
            />
            <Button
              type="submit"
              text="Удалить по индексу"
              disabled={!isIndexValid || indexInput.length === 0}
              isLoader={isInProgress}
              onClick={() => { setAction(LinkedListActions.Remove); }}
            />             
          </form>  
        </div>
        {content}
      </section>          
    </SolutionLayout>
  );
};
