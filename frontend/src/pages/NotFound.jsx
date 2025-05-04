import { Link } from 'react-router-dom'
import styles from '../styles/notFound.module.css'

export const NotFound = () => {
  return (
    <div className={`container ${styles.notfound}`}>
      <h1>Oops! Page Not Found</h1>
      <p>It seems that the page you're looking for doesn't exist.</p>
      <Link to="/">
        <button className="btn">Go Home</button>
      </Link>
    </div>
  )
}
