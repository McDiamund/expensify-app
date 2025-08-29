import styles from './ExperienceSection.module.css'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import sa1 from '@/assets/images/sa-1.png'
import elysian1 from '@/assets/images/elysian.png'
import productiveclouds1 from '@/assets/images/productiveclouds.png'
import note from '@/assets/images/note.jpg'


const ExperienceSection = () => {
  const [projectBarColors, setProjectBarColors] = useState<string[]>([])
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{
    name: string;
    images: string[];
    description: string;
    link: string;
  }>({
    name: '',
    images: [],
    description: '',
    link: ''
  });

  useEffect(() => {
    // Generate random colors for project bars - varied hues but consistent lighter shade
    const colors = [
      `rgb(184, 151, 100)`,  // Golden yellow
      `rgb(100, 168, 179)`,  // Teal blue  
      `rgb(179, 108, 99)`,  // Red-orange (coral)
      `rgb(149, 104, 165)`, // Purple
    ]
    setProjectBarColors(colors)
  }, [])

  return (
    <div className={styles.container}>
      <Box className={styles.contentImage} />
      <Box className={styles.content}>
        <Typography variant="h1" sx={{ fontSize: '80px', marginBottom: '30px' }} className={styles.homeCardTitle}>
          Experience
        </Typography>
        <div className={styles.contentWrapper}>
          <div className={styles.textContent}>
            <Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.6, marginBottom: '30px' }} className={styles.bodyText}>
            I started coding when I was 13 with HTML, CSS, and JavaScript, and I was enthralled from day one. In high school, I competed in web development contests and won a few awards.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.6, marginBottom: '30px' }} className={styles.bodyText}>
            Since then, I've worked on increasingly challenging projects. I've built WordPress sites for real estate companies and created a full e-commerce site from the ground up—handling everything from the design and functionality to creating the logo and working closely with the client to nail their vision.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.6 }} className={styles.bodyText}>
            Now I work primarily with React, server and serverless systems, and mobile development. At Productive Cloud Solutions, I've gained experience across a wide variety of tech stacks and architectures since every client brings different requirements and challenges.
            </Typography>
          </div>
          <div className={styles.timelineWrapper}>
            <div className={styles.timeline}>
          <div className={styles.yearBar}>
            <div className={styles.yearBarAccent}></div>
            <div className={styles.yearBarItem}>2021</div>
          </div>
          <div className={styles.event}>
            <div className={styles.monthBar}>
              <div className={styles.monthBarAccent}></div>
              <div className={styles.monthBarAccent}></div>
              <div className={styles.monthBarAccent}></div>
            </div>
            <div
              className={styles.projectBar + ' clickable'}
              style={{
                backgroundColor: projectBarColors[2] || '#2f86c0',
                color: '#ffffff'
              }}
              onClick={() => {
                setSelectedProject({
                  name: 'Superior Advantage Realtors',
                  images: [
                    sa1,
                  ],
                  description: 'Developed a comprehensive frontend application for a real estate company, focusing on user experience and email handling capabilities. Created detailed UI/UX mockups using Figma and Photoshop before implementing the solution in React.js. Successfully deployed the application to a shared hosting environment.',
                  link: 'https://superioradvantage-re.co'
                });
                setOpen(true);
              }}
            >
              <Typography variant="h2" sx={{ fontSize: '15px', lineHeight: 1.6 }}>Superior Advantage Realtors</Typography>
              <OpenInNewIcon />
            </div>
          </div>
          <div className={styles.yearBar}>
            <div className={styles.yearBarAccent}></div>
            <div className={styles.yearBarItem}>2022</div>
          </div>
          <div className={styles.event}>
            <div className={styles.monthBar}>
              <div className={styles.monthBarAccent}></div>
              <div className={styles.monthBarAccent}></div>
              <div className={styles.monthBarAccent}></div>
            </div>
            <div
              className={styles.projectBar + ' clickable'}
              style={{
                backgroundColor: projectBarColors[0] || '#2f86c0',
                color: '#ffffff'
              }}
              onClick={() => {
                setSelectedProject({
                  name: 'Elysian Custom Computers',
                  images: [
                    elysian1
                  ],
                  description: 'Architected and developed a complete e-commerce platform for a custom computer retailer serving the Anchorage, Alaska market. Built a sophisticated product customization system allowing customers to configure hardware specifications with real-time pricing updates. Implemented comprehensive inventory management, accounting for race conditions and stock availability.',
                  link: ''
                });
                setOpen(true);
              }}
            >
              <Typography variant="h2" sx={{ fontSize: '15px', lineHeight: 1.6 }}>Elysian Custom Computers</Typography>
              <OpenInNewIcon />
            </div>
          </div>
          <div className={styles.event}>
            <div className={styles.monthBar}>
              <div className={styles.monthBarAccent}></div>
              <div className={styles.monthBarAccent}></div>
              <div className={styles.monthBarAccent}></div>
            </div>
            <div
              className={styles.projectBar + ' clickable'}
              style={{
                backgroundColor: projectBarColors[1] || '#2f86c0',
                color: '#ffffff'
              }}
              onClick={() => {
                setSelectedProject({
                  name: 'Productive Cloud Solutions',
                  images: [
                    productiveclouds1
                  ],
                  description: 'Currently leading frontend development initiatives for a web consultancy serving diverse clients across multiple technology stacks. Manage code quality through pull request reviews and architectural decisions while collaborating with cross-functional teams to optimize application performance and reduce code redundancy.',
                  link: 'https://productivecloudsolutions.com/'
                });
                setOpen(true);
              }}
            >
              <Typography variant="h2" sx={{ fontSize: '15px', lineHeight: 1.6 }}>Productive Cloud Solutions</Typography>
              <OpenInNewIcon />
            </div>
          </div>
          <div className={styles.yearBar}>
            <div className={styles.yearBarAccent}></div>
            <div className={styles.yearBarItem}>2024</div>
          </div>
          <div className={styles.event}>
            <div className={styles.monthBar}>
              <div className={styles.monthBarAccent}></div>
              <div className={styles.monthBarAccent}></div>
              <div className={styles.monthBarAccent}></div>
            </div>
            <div
              className={styles.projectBar + ' clickable'}
              style={{
                backgroundColor: projectBarColors[3] || '#2f86c0',
                color: '#ffffff'
              }}
              onClick={() => {
                setSelectedProject({
                  name: 'Note.',
                  images: [
                    note
                  ],
                  description: 'Designed and built a comprehensive location-sharing and collaboration platform that enables users to save, annotate, and share favorite locations with friends. Implemented a serverless architecture using AWS services for scalability and cost-effectiveness.',
                  link: ''
                });
                setOpen(true);
              }}
            >
              <Typography variant="h2" sx={{ fontSize: '15px', lineHeight: 1.6 }}>Note.</Typography>
              <OpenInNewIcon />
            </div>
          </div>
          <div className={styles.yearBar}>
            <div className={styles.yearBarAccent}></div>
            <div className={styles.yearBarItem}>2025</div>
          </div>
            </div>
          </div>
        </div>
        <div className={styles.spacer}></div>
        <Typography
          variant="body1"
          sx={{
            fontSize: '20px',
            lineHeight: 1.6,
            textAlign: 'right',
            marginBottom: '20px',
            '@media (max-width:1300px)': {
              display: 'none'
            }
          }}
        >
          SCROLL/DRAG TO CONTINUE
        </Typography>
      </Box>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h2" sx={{ fontSize: '30px', lineHeight: 1.6 }}>{selectedProject.name}</Typography>
        </DialogTitle>
        <DialogContent sx={{ height: '63vh', minWidth: '600px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px' }}>
            <img src={selectedProject.images[0]} style={{ width: '80%', alignSelf: 'center', height: '80%', objectFit: 'contain', padding: '10px' }} alt={selectedProject.name}  />
            <Typography variant="body1" sx={{ fontSize: '20px', lineHeight: 1.6 }}>
              {selectedProject.description}
            </Typography>
          {selectedProject.link !== '' && <Box sx={{ marginTop: '20px', float: 'left' }}>
            <a
              href={selectedProject.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <button
                style={{
                  padding: '10px 24px',
                  fontSize: '16px',
                  backgroundColor: '#2f86c0',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: selectedProject.link ? 'pointer' : 'not-allowed',
                  opacity: selectedProject.link ? 1 : 0.6
                }}
                disabled={!selectedProject.link}
              >
                Visit Website
              </button>
            </a>
          </Box>}
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ExperienceSection