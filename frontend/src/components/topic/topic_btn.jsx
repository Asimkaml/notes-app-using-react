import styles from "./topic_btn.module.css"

const TopicBtn = (props) => {
    return (
        <>
            <div className={styles.topicBtn}>
                <div className={styles.topicIcon}></div>
                <p>{props.name}</p>
                {/* <div className={styles.topicCount}>
                    {props.count}
                </div> */}
            </div>
        </>
    );
}
export default TopicBtn;