import TopicBtn from "../topic/topic_btn.jsx";
import styles from "./sidebar.module.css";
const Sidebar = () => {
    const topics = {"Work":10, "Personal":5, "Ideas":8};
    
    return (
        <>
            <div className={styles.sidebar}>

                {Object.entries(topics).map(
                    ([key, value]) => (
                        <TopicBtn key={key} name={key} count={value} />
                    )
                )}
            </div>
        </>
    );
};
export default Sidebar;