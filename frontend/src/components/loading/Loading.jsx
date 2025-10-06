import 'loaders.css/loaders.min.css'

import Loader from 'react-loaders'
import styles from './Loading.module.sass'

export const Loading = () => (
  <div className={styles.loading}>
    <Loader type="ball-scale" active />
  </div>
)
