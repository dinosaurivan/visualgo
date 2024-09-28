// libraries
import React, { ChangeEventHandler, JSX, FormEvent, useEffect, useMemo, useState } from "react";

// components 
import { Input, Button, Circle, SolutionLayout } from "../../ui";

// styles
import styles from "./string.module.css";

// utils
import ElementData from "../../utils/element-data";
import sequentialUpdate from "../../utils/sequential-update";
import { MAX_STRING_LENGTH, MIN_STRING_LENGTH } from "../../utils/constants";

// data structures 
import { LettersArray } from "../../data-structures";



export default function StringPage(): JSX.Element {
  
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  
  const onChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setInputValue(target.value);
    setIsInputValid(target.validity.valid && (target.value.length >= MIN_STRING_LENGTH));
  };
  
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
    <SolutionLayout title="String Reversal">
      <section className={styles.container} data-testid="string-page">
        <form className={styles.form} onSubmit={onSubmit} data-testid="form">
          <Input 
            minLength={MIN_STRING_LENGTH}
            maxLength={MAX_STRING_LENGTH}
            isLimitText={true}     
            value={inputValue}
            data-testid="input"            
            onChange={onChange}
          />
          <Button 
            type="submit"
            text="Reverse it"
            data-testid="reverse-button"            
            disabled={!isInputValid}
            isLoader={isInProgress}
          />
        </form>
        {content}
      </section>
    </SolutionLayout>
  );
};
