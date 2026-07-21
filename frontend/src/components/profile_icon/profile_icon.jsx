import styles from "./profile_icon.module.css";
const ProfileIcon = () => {
    return (
        <>
            <div className={styles.profileContainer}>
                <div className={styles.profileIcon}>
                    <img src="./images/user_icon.png" alt="Profile Icon" />
                </div>
                <p>Username</p>
            </div>
        </>
    );
}

export default ProfileIcon;
