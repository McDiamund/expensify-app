import { useState, useEffect } from 'react'
import styles from './GoalsSection.module.css'
import wordHeader from '@/assets/images/word-header.png'
import mwordHeader from '@/assets/images/mword-header.jpg'

const GoalsSection = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 950)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <div className={styles.container}>
      <img 
        src={isMobile ? mwordHeader : wordHeader} 
        alt="wordHeader" 
        className={styles.wordHeader} 
      />
      <div className={styles.paper}></div>
      {/* <img src={wordFooter} alt="wordPages" className={styles.wordFooter} /> */}
    </div>
  )
}

export default GoalsSection