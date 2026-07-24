import styles from "./search_bar.module.css";
const SearchBar = (props) => {
    return (
        <>
            <div className={styles.searchBar}>
                <img src="./images/search_icon.png" alt="Search Icon" />
                <input
                    className={styles.searchInput}
                    type="text"
                    placeholder="Search notes..."
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                />
            </div>
        </>
    );
}
export default SearchBar;