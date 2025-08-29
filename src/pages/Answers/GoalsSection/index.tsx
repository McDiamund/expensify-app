import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import styles from './GoalsSection.module.css'
import wordHeader from '@/assets/images/word-header.png'
import mwordHeader from '@/assets/images/mword-header.jpg'

const GoalsSection = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [hasNavigated, setHasNavigated] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 950)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    const currentContainer = containerRef.current
    if (!currentContainer || hasNavigated) return

    // Different thresholds for mobile vs desktop
    const threshold = isMobile ? 0.8 : 1.0
    const rootMargin = isMobile ? '-10% 0px -10% 0px' : '0px'

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        // Check if the element meets the threshold for visibility
        if (entry.intersectionRatio >= threshold && !hasNavigated) {
          setHasNavigated(true)
          navigate('/word')
        }
      },
      {
        threshold: threshold,
        rootMargin: rootMargin
      }
    )

    observer.observe(currentContainer)

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer)
      }
    }
  }, [navigate, hasNavigated, isMobile])

  return (
    <div ref={containerRef} className={styles.container}>
      <img 
        src={isMobile ? mwordHeader : wordHeader} 
        alt="wordHeader" 
        className={styles.wordHeader} 
      />
      <div className={styles.paper}></div>
    </div>
  )
}

export default GoalsSection