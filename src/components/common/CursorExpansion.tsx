import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface CursorExpansionProps {
  isExpanding: boolean;
  cursorPosition: { x: number; y: number };
  onExpansionComplete: () => void;
}

const CursorExpansion = ({ isExpanding, cursorPosition, onExpansionComplete }: CursorExpansionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isExpanding) {
      setIsVisible(true);
    }
  }, [isExpanding]);

  const handleAnimationComplete = () => {
    if (isExpanding) {
      // Wait a bit before calling the completion callback
      setTimeout(() => {
        onExpansionComplete();
      }, 500);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Cursor expansion overlay */}
          <motion.div
            className="cursor-expansion-overlay"
            initial={{
              width: 35,
              height: 35,
              x: cursorPosition.x - 17.5,
              y: cursorPosition.y - 17.5,
              borderRadius: '50%',
              backgroundColor: 'rgba(206, 30, 59, 1)',
            }}
            animate={{
              width: window.innerWidth * 2,
              height: window.innerHeight * 2,
              x: -window.innerWidth / 2,
              y: -window.innerHeight / 2,
              borderRadius: '0%',
              backgroundColor: 'rgba(206, 30, 59, 1)',
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            onAnimationComplete={handleAnimationComplete}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: 10000,
              pointerEvents: 'none',
            }}
          />
          
          {/* Loading icon overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 10001,
              pointerEvents: 'none',
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress 
                size={80} 
                thickness={4}
                sx={{ 
                  color: 'white',
                  marginBottom: 2
                }} 
              />
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'white', 
                  marginTop: 2,
                  fontFamily: 'Outfit, sans-serif'
                }}
              >
                Loading...
              </Typography>
            </Box>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CursorExpansion;
