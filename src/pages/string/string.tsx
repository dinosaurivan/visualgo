// libraries
import { FC, FormEvent, useEffect, useMemo, useState } from "react";

// components 
import { Input, Button, Circle, SolutionLayout } from "../../ui";

// styles
import styles from "./string.module.css";

// hooks
import useForm from "../../hooks/use-form";

// utils
import { ElementData } from "../../utils/element-data";
import { sequentialUpdate } from "../../utils/sequential-update";

// data structures 
import { LettersArray } from "../../data-structures/letters-array";



export const StringPage: FC = () => {
  
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const { onChange } = useForm();
  
  const [isInProgress, setIsInProgress] = useState(false);
  
  const [state, setState] = useState<Array<ElementData<string>>>([]);
  const [history, setHistory] = useState<Array<typeof state>>([]);
  
  const onSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    const lettersArray = new LettersArray(inputValue);
    setHistory(lettersArray.reverse());
    setInputValue(""); 
    setIsInputValid(false);
  };
  
  useEffect(
    () => {
      let isMounted = true;
      if (history.length > 0) {
        setIsInProgress(true);
        sequentialUpdate<string>(history, setState, setIsInProgress, () => isMounted);
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
                  value={value}
                  color={color}
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
    <SolutionLayout title="Строка">
      <section className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit}>
          <Input 
            minLength={2}
            maxLength={11}
            isLimitText={true}     
            value={inputValue}
            onChange={onChange(setInputValue, setIsInputValid, false)}
          />
          <Button 
            type="submit"
            text="Развернуть"
            disabled={!isInputValid}
            isLoader={isInProgress}
          />
        </form>
        {content}
      </section>
    </SolutionLayout>
  );
};
