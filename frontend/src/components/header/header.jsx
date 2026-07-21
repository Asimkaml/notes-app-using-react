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
                    <button className={styles.themeToggleBtn}>
                        {dark}
                        <div className={styles.innerCircle}></div>
                    </button>
                <AddNoteBtn setNotes = {props.setNotes}/>
            </div>
        </>
    );
}
export default Header;  