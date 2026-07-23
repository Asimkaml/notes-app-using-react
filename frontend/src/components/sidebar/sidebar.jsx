import TopicBtn from "../topic/topic_btn.jsx";
import styles from "./sidebar.module.css";
const Sidebar = (props) => {
    
    return (
        <>
            <div className={styles.sidebar}>
                <TopicBtn name="Total Notes" count={props.notes.length} />
            </div>
        </>
    );
};
export default Sidebar;