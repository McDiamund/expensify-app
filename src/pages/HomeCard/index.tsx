import styles from './HomeCard.module.css'
import linkedin from '@/assets/images/linkedin.png'
import github from '@/assets/images/github.svg'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import CursorExpansion from '@/components/common/CursorExpansion';
import { motion } from 'motion/react';
import Answers from '../Answers';

const AnimatedTitle = () => {
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const fonts = [
    'Arial, sans-serif',
    'Georgia, serif',
    'Verdana, sans-serif',
    'Times New Roman, serif',
    'Courier New, monospace',
    'Impact, sans-serif',
    'Comic Sans MS, cursive',
    'Trebuchet MS, sans-serif',
    'Outfit, sans-serif', // This will be the main font
    'Lucida Console, monospace',
    'Palatino, serif',
    'Garamond, serif'
  ];

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (!isPaused) {
      intervalId = setInterval(() => {
        setCurrentFontIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % fonts.length;
          
          // Pause on Outfit font (index 8) for 3 seconds
          if (nextIndex === 8) {
            setIsPaused(true);
            setTimeout(() => setIsPaused(false), 3000);
          }
          
          return nextIndex;
        });
      }, 90); // Change font every 90ms
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPaused]);

  return (
    <Typography 
      variant="h1" 
      sx={{ 
        fontFamily: fonts[currentFontIndex],
        transition: 'font-family 0.1s ease-in-out'
      }} 
      className={styles.homeCardTitle}
    >
      Elias Treadway
    </Typography>
  );
};

const HomeCard = () => {
  const [isExpanding, setIsExpanding] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [currentPage, setCurrentPage] = useState<'home' | 'answers'>('home');

  const handleSeeMoreClick = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
    setIsExpanding(true);
  };

  const handleExpansionComplete = () => {
    setCurrentPage('answers');
    setIsExpanding(false);
  };

  if (currentPage === 'answers') {
    return <Answers />;
  }

  return (
    <>
      <div className={styles.homeCard}>
        <div>
          <AnimatedTitle />
          <Typography variant="body1" className={styles.homeCardSubtitle}>FULL STACK ENGINEER</Typography>
        </div>
        <div className={styles.socialIcons}>
          <a target="_blank" href="https://www.linkedin.com/in/elias-treadway-41293b1b5/" rel="noopener noreferrer">
            <img 
              src={linkedin} 
              className={styles.socialIcon}
              style={{ 
                width: 'clamp(40px, 8vw, 80px)', 
                height: 'clamp(40px, 8vw, 80px)' 
              }} 
              alt="linkedin" 
            />
          </a>
          <a target="_blank" href="https://github.com/McDiamund" rel="noopener noreferrer">
            <img 
              src={github} 
              className={styles.socialIcon}
              style={{ 
                width: 'clamp(30px, 6vw, 60px)', 
                height: 'clamp(30px, 6vw, 60px)' 
              }} 
              alt="github" 
            />
          </a>
        </div>
        <motion.div
          className="clickable"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            position: 'absolute', 
            bottom: 'clamp(20px, 5vh, 50px)',
            cursor: 'none'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSeeMoreClick}
        >
          <ArrowOutwardIcon sx={{ 
            rotate: '180deg', 
            fontSize: 'clamp(40px, 8vw, 80px)', 
            marginTop: 'clamp(5px, 1vh, 10px)' 
          }} />
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: 'clamp(14px, 2.5vw, 20px)', 
              fontWeight: 'bold', 
              paddingTop: 'clamp(2px, 0.5vh, 5px)' 
            }}
          >
            SEE MORE
          </Typography>
        </motion.div>
      </div>
      
      <CursorExpansion
        isExpanding={isExpanding}
        cursorPosition={cursorPosition}
        onExpansionComplete={handleExpansionComplete}
      />
    </>
  )
}

export default HomeCard