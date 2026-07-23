import ProfileIcon from "../profile_icon/profile_icon.jsx";
import SearchBar from "../search_bar/search_bar.jsx";
import AddNoteBtn from "../button/add_note_btn.jsx";

import styles from './header.module.css';
const Header = (props) => {
    let dark = "ON"
    return (
        <>
            <div className={styles.header}>

                <ProfileIcon />
                <div className={styles.allNotes}>All Notes</div>
                <SearchBar />
                    <button className={styles.themeToggleBtn} onClick={props.toggleTheme}>
                        <div className={`${styles.innerCircleDark} 
                        ${props.theme === "light" ? styles.innerCircleLight : ""}`}>
                            {/* {props.theme === "dark" ? "dark" : "light"} */}

                        </div>
                    </button>
                <AddNoteBtn notes={props.notes} setNotes={props.setNotes}/>
            </div>
        </>
    );
}
export default Header;  