import styles from "./profile_icon.module.css";
import { useAuth } from "../../context/auth_context.jsx";

const ProfileIcon = () => {
  const { user, logout } = useAuth();
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileIcon}>
        <img src="./images/user_icon.png" alt="Profile Icon" />
      </div>
      <p>{user.name}</p>
      <button className={styles.logoutBtn} onClick={logout}>Log out</button>
    </div>
  );
};
export default ProfileIcon;