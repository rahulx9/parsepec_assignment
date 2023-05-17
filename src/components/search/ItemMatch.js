import styles from "./itemMatch.module.css";

function ItemMatch({ text = "", query = "", index }) {
  const endItem = index + query.length;
  return (
    <>
      {text.slice(0, index)}
      <span className={styles["item-match"]}>{text.slice(index, endItem)}</span>
      {text.slice(endItem)}
    </>
  );
}

export default ItemMatch;
