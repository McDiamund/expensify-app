import styles from './Word.module.css'
import wordHeader from '@/assets/images/word-header.png'
import wordFooter from '@/assets/images/word-footer.png'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'motion/react'

// You can easily change this text by modifying the content below
const TYPING_TEXT = `GOALS
---------
Throughout my career, I've deliberately sought diverse experiences with different companies to build a strong foundation and gain versatility as a developer. These experiences have been invaluable in teaching me to wear multiple hats, adapt quickly, and deliver solutions with limited resources.

Now, I'm ready to step into a larger organization where I can learn more enterprise-level development practices, contribute to products that impact millions of users, and collaborate with world-class engineering teams.

SCROLL TO CONTINUE

`

const TypingEffect = ({ text, speed = 50 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, text, speed])

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(cursorTimer)
  }, [])

  return (
    <div className={styles.typingContainer}>
      <div className={styles.typingText}>
        {displayedText}
        <span className={`${styles.cursor} ${showCursor ? styles.cursorVisible : ''}`}>|</span>
      </div>
    </div>
  )
}

const Word = () => {
    const navigate = useNavigate()
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = (scrollTop / docHeight) * 100
            
            setScrollProgress(progress)
            
            // Navigate to BSOD when scroll reaches 60%
            if (progress >= 60) {
                navigate('/bsod')
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [navigate])

    return (
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img src={wordHeader} alt="wordHeader" className={styles.wordHeader} />
        <div className={styles.paper}>
          <TypingEffect text={TYPING_TEXT} speed={25} />
        </div>
        <img src={wordFooter} alt="wordPages" className={styles.wordFooter} />
        
        {/* Scroll progress indicator */}
        {/* <motion.div 
          className={styles.scrollProgress}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {Math.round(scrollProgress)}%
        </motion.div> */}
      </motion.div>
      );
}

export default Word