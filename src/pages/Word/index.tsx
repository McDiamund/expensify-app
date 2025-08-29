import styles from './Word.module.css'
import wordHeader from '@/assets/images/word-header.png'
import wordFooter from '@/assets/images/word-footer.png'
import mwordHeader from '@/assets/images/mword-header.jpg'
import mwordFooter from '@/assets/images/mword-footer.jpg'
import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router'

// You can easily change this text by modifying the content below
const TYPING_TEXT = `GOALS
---------
Throughout my career, I've deliberately sought diverse experiences with different companies to build a strong foundation and gain versatility as a developer. These experiences have been invaluable in teaching me to wear multiple hats, adapt quickly, and deliver solutions with limited resources.

Now, I'm ready to step into a larger organization where I can learn more enterprise-level development practices, contribute to products that impact millions of users, and collaborate with new engineering teams.

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
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 950)
    const navigate = useNavigate()

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0)
        
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 950)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = (scrollTop / docHeight) * 100
  
            const scrollThreshold = 60
            
            if (progress >= scrollThreshold) {
                navigate('/bsod')
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [navigate, isMobile])

    return (
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img src={isMobile ? mwordHeader : wordHeader} alt="wordHeader" className={styles.wordHeader} />
        <div className={styles.paper}>
          <TypingEffect text={TYPING_TEXT} speed={22} />
        </div>
        <img src={isMobile ? mwordFooter : wordFooter} alt="wordPages" className={styles.wordFooter} />
      </motion.div>
      );
}

export default Word