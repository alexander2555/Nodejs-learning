import styles from './Checkbox.module.sass'
import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa'

export const Checkbox = ({ title, ...props }) => {
  return (
    <label className={styles['checkbox']} title={title}>
      <input type="checkbox" className={styles.checkboxInput} {...props} />
      <span className={styles['checkbox-icon']}>
        {props.checked ? <FaRegCheckCircle /> : <FaRegCircle />}
      </span>
    </label>
  )
}
