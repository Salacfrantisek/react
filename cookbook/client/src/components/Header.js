import React from "react";
import styles from "../style/css/cookbook.module.css";

function CookbookInfo(props) {
    return (
        <div className={styles.cookbookHeader}>
            {props.cookbook.name}
        </div>
    );
}
export default CookbookInfo