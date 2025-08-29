import styles from './PortfolioSection.module.css'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import roadwork from '@/assets/images/road_work.png'
 
const PortfolioSection = () => {
  return (
    <div className={styles.container}>
      <Box className={styles.content}>
        <Typography variant="h1" sx={{ fontSize: '80px', marginBottom: '40px' }} className={styles.homeCardTitle}>
          Portfolio in the making
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '20px', lineHeight: 1.6, marginBottom: '30px' }} className={styles.bodyText}>
        My portfolio website is currently in development as I curate and showcase my work in 3D modeling, 2D design, and web development. While I believe in presenting polished, production-ready work, I'm excited to share that this website as my application!
        </Typography>
        <div style={{ flex: 1 }}></div>
        <Typography variant="body1" sx={{ fontSize: '20px', lineHeight: 1.6, textAlign: 'right', marginBottom: '20px' }} className={styles.bodyText}>SCROLL/DRAG TO CONTINUE</Typography>
      </Box>
      <Box className={styles.contentImage}>
        <img className={styles.roadworkImage} src={roadwork} alt="Roadwork" />
        <Box className={styles.imageContainer} />
      </Box>
    </div>
  )
}

export default PortfolioSection