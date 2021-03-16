import styles from './Footer.module.css';

const Footer = () => {
  return (
      <div className={styles.container}>
        <p>&copy; GREAT APP {new Date().getFullYear()}</p>
      </div>
  );
}

export default Footer;
