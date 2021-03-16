import styles from './Header.module.css';
import logo from './logo.png';
import LoginBlock from "./auth/LoginBlock";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img alt='app-logo' src={logo} />
      </div>
      <div className={styles.title}>
        <span>Grate APP</span>
      </div>
      <div className={styles.login}><LoginBlock /></div>
    </div>
  );
}

export default Header;