import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa'
import styles from './Radio.module.sass'

export const Radio = ({ className, children, option, title, ...props }) => {
  return (
    <label
      className={styles['radio'] + (className ? ' ' + className : '')}
      title={title}
    >
      <input type="radio" className={styles.checkboxInput} {...props} />
      <span className={styles['radio-icon']}>
        {props.checked ? <FaRegCheckCircle /> : <FaRegCircle />}
      </span>
      <span className={styles['radio-option']}>{option}</span>
      {children}
    </label>
  )
}
