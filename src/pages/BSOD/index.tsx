import styles from './BSOD.module.css'
import qrcode from '@/assets/images/qr-code.png'
import { Link } from 'react-router'

const BSOD = () => {
  return (
    <div className={styles.container} style={{ overflow: 'auto' }}>
      <header className={styles.header}>
        <Link to="/" className={styles.closeButton}>
          ✕
        </Link>
      </header>
      <div className={styles.bsod}>
        <p className={styles.sadFace}>{':('}</p>
        <p className={styles.title}>How did we get here?</p>
        <div style={{ width: '70%' }}>
          <p className={styles.bodyText}>Anyway, I discovered this opportunity through LinkedIn, and I'm genuinely excited about the possibility of joining your team. What immediately caught my attention wasn't just the technical requirements—which align perfectly with my skills—but Expensify's unique company culture and mission.</p>
          <p className={styles.bodyText}>Thank you for taking the time to review my application. I look forward to the possibility of contributing to Expensify's mission and growing alongside your exceptional team.</p>
        </div>
        <div style={{ display: 'flex', marginTop: '40px' }}>
          <img src={qrcode} style={{ width: '120px', height: '120px' }} alt="bsodFooter" className={styles.qrcode} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginLeft: '20px' }}>
            <p className={styles.infoText}>For more information about me and my work visit my LinkedIn</p>
            <div>
              <p className={styles.infoText}>If you call a support person, give them this info:</p>
              <p className={styles.infoText}>Stop code: THANK_YOU</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BSOD