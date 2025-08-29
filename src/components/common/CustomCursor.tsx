import { useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import TouchAppIcon from '@mui/icons-material/TouchApp';

const CustomCursor = () => {
  const location = useLocation();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isLink, setIsLink] = useState(false);
  
  // On BSOD and Word pages, show normal cursor and hide custom cursor
  useEffect(() => {
    if (location.pathname === '/bsod' || location.pathname === '/word') {
      // Show normal cursor on BSOD and Word pages
      document.body.style.cursor = 'auto';
      // Also show normal cursor on clickable elements
      const clickableElements = document.querySelectorAll('a, button, [role="button"], .clickable');
      clickableElements.forEach(el => {
        (el as HTMLElement).style.cursor = 'pointer';
      });
    } else {
      // Hide normal cursor on other pages for custom cursor
      document.body.style.cursor = 'none';
      const clickableElements = document.querySelectorAll('a, button, [role="button"], .clickable');
      clickableElements.forEach(el => {
        (el as HTMLElement).style.cursor = 'none';
      });
    }

    // Cleanup function to restore normal cursor when component unmounts
    return () => {
      document.body.style.cursor = 'auto';
      const clickableElements = document.querySelectorAll('a, button, [role="button"], .clickable');
      clickableElements.forEach(el => {
        (el as HTMLElement).style.cursor = 'auto';
      });
    };
  }, [location.pathname]);

  const updatePosition = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseEnter = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A' || target.closest('a')) {
      setIsLink(true);
      setIsHovering(false);
    } else if (target.classList.contains('clickable') || target.closest('.clickable')) {
      setIsHovering(true);
      setIsLink(false);
    } else {
      setIsHovering(false);
      setIsLink(false);
    }
  }, []);

  const cursorClasses = useMemo(() => {
    return [
      'custom-cursor',
      isHovering ? 'hover' : '',
      isLink ? 'link' : ''
    ].filter(Boolean).join(' ');
  }, [isHovering, isLink]);

  useEffect(() => {
    // Only add event listeners if not on BSOD or Word pages
    if (location.pathname === '/bsod' || location.pathname === '/word') {
      return;
    }

    let animationFrameId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame to smooth out the movement
      animationFrameId = requestAnimationFrame(() => {
        updatePosition(e);
      });
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseEnter, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [updatePosition, handleMouseEnter, location.pathname]);

  // Don't render custom cursor on BSOD or Word pages
  if (location.pathname === '/bsod' || location.pathname === '/word') {
    return null;
  }

  return (
    <div
      className={cursorClasses}
      style={{
        left: position.x,
        top: position.y,
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)',
      }}
    >
      {isLink && (
        <ArrowOutwardIcon 
          sx={{ 
            color: 'white', 
            fontSize: '18px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))'
          }} 
        />
      )}
      {isHovering && (
        <TouchAppIcon 
          sx={{ 
            color: 'white', 
            fontSize: '24px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))'
          }} 
        />
      )}
    </div>
  );
};

export default CustomCursor;
