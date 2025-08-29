import { useRef, useCallback, useState, useEffect } from "react";
import styles from './Answers.module.css';
import Word from "../Word";
import PortfolioSection from "./PortfolioSection";
import ExperienceSection from "./ExperienceSection";
import GoalsSection from "./GoalsSection";
import { useNavigate } from "react-router";

const Answers = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number | null>(null);
    const lastWheelTimeRef = useRef<number>(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [showVerticalPage, setShowVerticalPage] = useState(false);
    const navigate = useNavigate();
    // Scroll to top when vertical page is shown
    useEffect(() => {
      if (showVerticalPage) {
        window.scrollTo(0, 0);
        navigate('/word');
      }
    }, [showVerticalPage]);

    const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
      // Check if we're at the last section and should show vertical page
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const scrollLeft = container.scrollLeft;
        const containerWidth = container.clientWidth;
        const scrollWidth = container.scrollWidth;
        
        // If we're at or very close to the end (last section), show vertical page
        if (scrollLeft + containerWidth >= scrollWidth - 10) {
          setShowVerticalPage(true);
          return;
        }
      }

      // Convert vertical scroll to horizontal movement
      e.preventDefault();
      
      const now = Date.now();
      const timeSinceLastWheel = now - lastWheelTimeRef.current;
      
      // Throttle wheel events to prevent overwhelming the scroll
      if (timeSinceLastWheel < 50) { // Increased throttle for better snap behavior
        return;
      }
      
      lastWheelTimeRef.current = now;
      
      if (scrollContainerRef.current && animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const sectionWidth = container.clientWidth; // Each section is 100vw
        const currentSection = Math.round(container.scrollLeft / sectionWidth);
        
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
    }, []);

    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      console.log('Mouse down - setting dragging to true');
      setIsDragging(true);
      setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
      setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
      
      // Hide cursor at document level
      document.body.style.cursor = 'none';
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      e.preventDefault();
      
      if (scrollContainerRef.current) {
        const x = e.pageX - (scrollContainerRef.current.offsetLeft || 0);
        const walk = (x - startX) * 2; // Scroll speed multiplier
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
      }
    }, [isDragging, startX, scrollLeft]);

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

    // If showing vertical page, render the vertical scrolling version
    if (showVerticalPage) {
      return <Word />
    }
  
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
          {/* Page 1: Personal Introduction */}
          <PortfolioSection />
  
          {/* Page 2: Skills & Technologies */}
          <ExperienceSection /> 
  
          {/* Page 3: Experience & Projects - This will trigger the vertical page */}
          <GoalsSection />
        </div>
    );
  };

  export default Answers