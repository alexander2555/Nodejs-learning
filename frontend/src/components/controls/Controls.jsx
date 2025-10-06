import styles from './Controls.module.sass'

export const Controls = ({ bottom, children }) => {
  return (
    <div
      className={
        styles.controls + (bottom ? ' ' + styles['controls-bottom'] : '')
      }
    >
      {children}
    </div>
  )
}
