import styles from "./searchItem.module.css";

function SearchItem({ item, query, selected = false }) {
  return (
    <div
      className={`${styles.wrapper} ${selected && styles["wrapper-selected"]}`}
    >
      <div className={styles.id}>{item.id}</div>
      <div className={styles.name}>{item.name}</div>
      {item.hasItem && (
        <>
          <hr className={styles.hr} />
          <div className={styles.query}>"{query}" found in items</div>
          <hr className={styles.hr} />
        </>
      )}
      <div className={styles.address}>{item.address}</div>
    </div>
  );
}

export default SearchItem;
