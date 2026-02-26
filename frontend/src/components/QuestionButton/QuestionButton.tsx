import styles from './QuestionButton.module.css'

type QuestionButtonProps = {
  buttonName: string;
  clicked: boolean;
  handleClick: () => void;
}

export function QuestionButton(props: QuestionButtonProps) {
  return (
    <button
      className={`
              ${styles.btn}
              ${props.clicked ? styles.selected : ""}
            `}
      type='button'
      onClick={props.handleClick}
    >
      {props.buttonName} 
    </button>

  )
}