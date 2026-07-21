import TopicBtn from "../topic/topic_btn.jsx";
import styles from "./sidebar.module.css";
const Sidebar = (props) => {
    
    return (
        <>
            <div className={styles.sidebar}>

                {Object.entries(props.titles).map(
                    ([key, value]) => (
                        <TopicBtn key={key} name={value} count={value} />
                    )
                )}
            </div>
        </>
    );
};
export default Sidebar;