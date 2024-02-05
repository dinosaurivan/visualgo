// libraries
import { FC, FormEvent, useMemo, useState } from "react";

// components 
import { Input, Button, Circle, SolutionLayout } from "../../ui";

// styles
import styles from "./string.module.css";

// hooks
import useForm from "../../hooks/use-form";

// utils
import { ElementData } from "../../utils/element-data";

// algorithms 
import { reverseArray } from "../../algorithms/reverse-array";



export const StringPage: FC = () => {
  
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const { onChange } = useForm();
  
  const [isInProgress, setIsInProgress] = useState(false);
  const [currentReversalState, setCurrentReversalState] = useState<Array<ElementData<string>>>([]);
  
  const preview = useMemo(
    () => [...inputValue].map(
      (letter) => new ElementData(letter)
    ),
    [inputValue]
  );
  
  const onSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    setIsInProgress(true);
    await reverseArray(preview, setCurrentReversalState);
    setInputValue("");
    setIsInProgress(false);
  };
  
  const content = useMemo(
    () => {
      const state = currentReversalState.length ? currentReversalState : preview;
      return (
        <ul className={styles.list}>
          {
            state.map(
              ({state, value}, index) => (
                <li className={styles.item} key={index}>
                  <Circle 
                    state={state}
                    value={value}
                  />
                </li>
              )
            )
          }
        </ul>
      );
    },
    [currentReversalState, preview]
  );
  
  return (
    <SolutionLayout title="Строка">
      <section className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit}>
          <Input 
            minLength={2}
            maxLength={11}
            isLimitText={true}     
            value={inputValue}
            onChange={onChange(setInputValue, setIsInputValid)}
          />
          <Button 
            text="Развернуть"
            disabled={!isInputValid}
            type="submit"
            isLoader={isInProgress}
          />
        </form>
        {content}
      </section>
    </SolutionLayout>
  );
};
