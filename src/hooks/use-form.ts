// libraries
import { Dispatch, useCallback, ChangeEvent, SetStateAction } from "react";



type OnChangeCallbackType = (
  valueSetter: Dispatch<SetStateAction<string>>,
  validitySetter: Dispatch<SetStateAction<boolean>>,
  allowEmpty: boolean
) => (event: ChangeEvent<HTMLInputElement>) => void;

function useForm() {
  
  const onChange = useCallback<OnChangeCallbackType>(
    (valueSetter, validitySetter, allowEmpty) => ({ target }) => {
      valueSetter(target.value);
      validitySetter(
        target.validity.valid && 
        (allowEmpty ? true : target.value.length > 0)
      );
    },
    []
  );
  
  return { onChange };
};

export default useForm;
