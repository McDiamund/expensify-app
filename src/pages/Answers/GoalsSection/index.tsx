import styles from './GoalsSection.module.css'
import wordHeader from '@/assets/images/word-header.png'
import wordFooter from '@/assets/images/word-footer.png'

const GoalsSection = () => {
  return (
    <div className={styles.container}>
      <img src={wordHeader} alt="wordHeader" className={styles.wordHeader} />
      <div className={styles.paper}></div>
      <img src={wordFooter} alt="wordPages" className={styles.wordFooter} />
    </div>
  )
}

export default GoalsSection