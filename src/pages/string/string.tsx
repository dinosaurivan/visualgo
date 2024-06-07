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
import { LettersArray } from "../../data-structures";



export const StringPage: FC = () => {
  
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const { onChange } = useForm();
  
  const [isInProgress, setIsInProgress] = useState(false);
  
  const [step, setStep] = useState<Array<ElementData<string>>>([]);
  const [steps, setSteps] = useState<Array<typeof step>>([]);
  
  const onSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    const lettersArray = new LettersArray(inputValue);
    setSteps(lettersArray.getReversalSteps());
    setInputValue(""); 
    setIsInputValid(false);
  };
  
  useEffect(
    () => {
      let isMounted = true;
      if (steps.length > 0) {
        setIsInProgress(true);
        sequentialUpdate<string>(steps, setStep, setIsInProgress, () => isMounted);
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
    [step]
  );
  
  return (
    <SolutionLayout title="Строка">
      <section className={styles.container} data-testid="string-page">
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
