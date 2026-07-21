import styles from "./search_bar.module.css";
const SearchBar = () => {
    return (
        <>
            <div className={styles.searchBar}>
                <img src="./images/search_icon.png" alt="Search Icon" />
            </div>
        </>
    );
}
export default SearchBar;