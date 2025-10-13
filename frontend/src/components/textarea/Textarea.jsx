import styles from './Textarea.module.sass'

export const Textarea = ({ tag, ...props }) => {
  return (
    <textarea
      className={styles.textarea + (tag ? ' ' + styles.tag : '')}
      {...props}
    ></textarea>
  )
}
