
import type React from 'react';
import styles from './QuestionButton.module.css'

type QuestionButtonProps = {
  buttonName: string;
  currentValue: boolean;
  formKey: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  setFormState: React.Dispatch<React.SetStateAction<{
    favorite: string;
    isNew: boolean;
    isClassic: boolean;
    isFun: boolean;
    isSerious: boolean;
    isInspiring: boolean;
    isScary: boolean;
    island: string;
  }>>;

}

export function QuestionButton(props: QuestionButtonProps) {

  const handleClick = (
    key: string, 
    currentBtnValue: boolean, 
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    props.setFormState(prev => ({...prev, [key]: !currentBtnValue}))
    setter(prev => !prev)
  }

  return (
    <button
      className={`
              ${styles.btn}
              ${props.currentValue ? styles.selected : ""}
            `}
      type='button'
      onClick={() => handleClick(props.formKey, props.currentValue, props.setState)}
    >
      {props.buttonName} 
    </button>

  )
}