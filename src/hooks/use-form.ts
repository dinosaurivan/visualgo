// libraries
import { Dispatch, useCallback, ChangeEvent, SetStateAction } from "react";



type OnChangeCallbackType = (
  valueSetter: Dispatch<SetStateAction<string>>,
  validitySetter: Dispatch<SetStateAction<boolean>>,
  allowEmpty: boolean
) => (event: ChangeEvent<HTMLInputElement>) => void;

function useForm() {
  
  const onChange = useCallback<OnChangeCallbackType>(
    (valueSetter, validitySetter, allowEmpty) => (event) => {
      valueSetter(event.target.value);
      validitySetter(event.target.validity.valid && (allowEmpty ? true : event.target.value.length > 0));
    },
    []
  );
  
  return { onChange };
};

export default useForm;
