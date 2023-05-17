import { useEffect, useMemo, useRef, useState } from "react";
import { getData } from "../../services/search";
import { getSearchQuery } from "../../utils/searchUtils";
import styles from "./search.module.css";
import SearchItem from "./SearchItem";

function Search() {
  const [queryList, setQueryList] = useState([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState();
  const resultsRef = useRef();
  const inputRef = useRef();

  function filterList() {
    if (!query) return [];
    const list = queryList.reduce((acc, item) => {
      const newItem = structuredClone(item);
      let hasMatch = false;

      let res = getSearchQuery(newItem.name, query);
      hasMatch ||= res.hasMatch;
      newItem.name = res.value;

      res = getSearchQuery(newItem.address, query);
      hasMatch ||= res.hasMatch;
      newItem.address = res.value;

      res = getSearchQuery(newItem.id, query);
      hasMatch ||= res.hasMatch;
      newItem.id = res.value;

      res = getSearchQuery(newItem.pincode, query);
      hasMatch ||= res.hasMatch;
      newItem.pincode = res.value;

      const index = newItem.items.findIndex(
        (item) => item.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
      if (index !== -1) {
        hasMatch = true;
        newItem.hasItem = true;
      }
      return hasMatch ? [...acc, newItem] : acc;
    }, []);
    return list;
  }

  const filteredList = useMemo(filterList, [query]);


  async function fetchData() {
    const res = await getData();
    setQueryList(res);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (filteredList) {
      document.body.addEventListener("keydown", onKeyDown);
    } else {
      document.body.removeEventListener("keydown", onKeyDown);
    }
    return () => {
      document.body.removeEventListener("keydown", onKeyDown);
    };
  }, [filteredList]);

  function onKeyDown(event) {
    if (resultsRef?.current) {
      const searchListItems = Array.from(resultsRef.current.children);
      switch (event.key) {
        case "ArrowUp":
          setSelected((selected) => {
            let itemIndex;
            if (selected === undefined) {
              itemIndex = 0;
            } else if (searchListItems[selected - 1]) {
              itemIndex = selected - 1;
            } else {
              inputRef.current.focus();
            }
            searchListItems[itemIndex]?.scrollIntoView();
            return itemIndex;
          });
          break;
        case "ArrowDown":
          setSelected((selected) => {
            let itemIndex;
            if (selected === undefined) {
              itemIndex = 0;
            } else if (searchListItems[selected + 1]) {
              itemIndex = selected + 1;
            } else {
              inputRef.current.focus();
            }
            searchListItems[itemIndex]?.scrollIntoView();
            return itemIndex;
          });
          break;
        default:
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles["search-wrapper"]}>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          className={styles["search-input"]}
          type="search"
          placeholder="Search users by ID, address, names"
        />
      </div>
      {query && (
        <ul
          className={styles["search-item-wrapper"]}
          ref={resultsRef}
          onMouseLeave={(e) => {
            setSelected();
          }}
        >
          {filteredList.length > 0 ? (
            filteredList.map((item, index) => (
              <li
                key={index}
                data-index={index}
                onMouseEnter={() => {
                  setSelected(index);
                }}
              >
                <SearchItem
                  item={item}
                  query={query}
                  selected={index === selected}
                />
              </li>
            ))
          ) : (
            <li className={styles["no-data-found"]}>No User Found</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default Search;
