import React from "react";
import styles from "../style/css/cookbook.module.css";

function CookbookInfo(props) {
    return (
        <span className={styles.cookbookHeader}>
            {props.cookbook.name}
        </span>
    );
}
export default CookbookInfo