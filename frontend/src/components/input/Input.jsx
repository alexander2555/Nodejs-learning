import styles from './Input.module.sass'

export const Input = ({ className, ...props }) => {
  return (
    <input
      className={styles.input + (className ? ' ' + className : '')}
      {...props}
    />
  )
}
