import styles from './Textarea.module.sass'

export const Textarea = ({ className, ...props }) => {
  return (
    <textarea
      className={styles.textarea + (className ? ' ' + className : '')}
      {...props}
    ></textarea>
  )
}
