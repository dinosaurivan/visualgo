// libraries
import { Dispatch, useCallback, ChangeEvent, SetStateAction } from "react";



type OnChangeCallbackType = (
  valueSetter: Dispatch<SetStateAction<string>>,
  validitySetter: Dispatch<SetStateAction<boolean>>
) => (event: ChangeEvent<HTMLInputElement>) => void;

function useForm() {
  
  const onChange = useCallback<OnChangeCallbackType>(
    (valueSetter, validitySetter) => (event) => {
      valueSetter(event.target.value);
      validitySetter(event.target.validity.valid);
    },
    []
  );
  
  return { onChange };
};

export default useForm;
