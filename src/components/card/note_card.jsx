import styles from "./note_card.module.css"
const NoteCard = (props) => {
    return (
        <>
        <div className={styles.card}>
            <span className={styles.cardTitle}>{props.title}</span>
            <div className={styles.topicLabel}>{props.topic}</div>
            <div className={styles.cardContent}>
                <p>{props.content}</p>
            </div>
        </div>
        </>
    );
}
export default NoteCard;