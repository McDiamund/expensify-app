import { useRef, useCallback, useState, useEffect } from "react";
import styles from './Answers.module.css';
import PortfolioSection from "./PortfolioSection";
import ExperienceSection from "./ExperienceSection";
import GoalsSection from "./GoalsSection";

const Answers = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number | null>(null);
    const lastWheelTimeRef = useRef<number>(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Detect if we're in mobile mode (screen width <= 950px)
    useEffect(() => {
      const checkScreenSize = () => {
        setIsMobile(window.innerWidth <= 950);
      };

      checkScreenSize(); // Check initially
      window.addEventListener('resize', checkScreenSize);
      
      return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
      if (!scrollContainerRef.current) return;

      const container = scrollContainerRef.current;

      if (isMobile) {
        // Mobile: vertical scrolling behavior - allow natural scrolling
        return;
      } else {
        // Desktop: horizontal scrolling behavior
        const scrollLeft = container.scrollLeft;
        const containerWidth = container.clientWidth;
        
        // Convert vertical scroll to horizontal movement
        e.preventDefault();
        
        const now = Date.now();
        const timeSinceLastWheel = now - lastWheelTimeRef.current;
        
        // Throttle wheel events to prevent overwhelming the scroll
        if (timeSinceLastWheel < 50) { // Increased throttle for better snap behavior
          return;
        }
        
        lastWheelTimeRef.current = now;
        
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        
        const sectionWidth = containerWidth; // Each section is 100vw
        const currentSection = Math.round(scrollLeft / sectionWidth);
        
        // Determine scroll direction and target section
        let targetSection = currentSection;
        if (e.deltaY > 0) {
          // Scrolling down/right - go to next section
          targetSection = Math.min(currentSection + 1, 2); // Max 3 sections (0, 1, 2)
        } else if (e.deltaY < 0) {
          // Scrolling up/left - go to previous section
          targetSection = Math.max(currentSection - 1, 0);
        }
        
        // Only scroll if we're changing sections
        if (targetSection !== currentSection) {
          const targetScrollLeft = targetSection * sectionWidth;
          container.scrollTo({
            left: targetScrollLeft,
            behavior: 'smooth'
          });
        }
      }
    }, [isMobile]);

    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      console.log('Mouse down - setting dragging to true');
      setIsDragging(true);
      
      if (isMobile) {
        // Mobile: vertical dragging
        setStartY(e.pageY - (scrollContainerRef.current?.offsetTop || 0));
        setScrollTop(scrollContainerRef.current?.scrollTop || 0);
      } else {
        // Desktop: horizontal dragging
        setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
        setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
      }
      
      // Hide cursor at document level
      document.body.style.cursor = 'none';
    }, [isMobile]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging || !scrollContainerRef.current) return;
      e.preventDefault();
      
      if (isMobile) {
        // Mobile: vertical dragging
        const y = e.pageY - (scrollContainerRef.current.offsetTop || 0);
        const walk = (y - startY) * 2; // Scroll speed multiplier
        scrollContainerRef.current.scrollTop = scrollTop - walk;
      } else {
        // Desktop: horizontal dragging
        const x = e.pageX - (scrollContainerRef.current.offsetLeft || 0);
        const walk = (x - startX) * 2; // Scroll speed multiplier
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
      }
    }, [isDragging, startX, startY, scrollLeft, scrollTop, isMobile]);

    const handleMouseUp = useCallback(() => {
      console.log('Mouse up - setting dragging to false');
      setIsDragging(false);
      
      // Restore cursor
      document.body.style.cursor = '';
    }, []);

    const handleMouseLeave = useCallback(() => {
      console.log('Mouse leave - setting dragging to false');
      setIsDragging(false);
      
      // Restore cursor
      document.body.style.cursor = '';
    }, []);
  
    return (
        <div 
          className={`${styles.magazineContainer} ${isDragging ? styles.dragging : ''}`}
          ref={scrollContainerRef} 
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <PortfolioSection />
          <ExperienceSection /> 
          <GoalsSection />
        </div>
    );
  };

  export default Answers