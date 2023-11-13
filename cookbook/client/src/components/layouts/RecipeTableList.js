import React from "react";
import Recipe from "./Recipe";

function RecipeGridList(props) {

    //todo: add card styling
    /*

     */

    function RecipeCardList(props) {
        return props.recipeList.map((recipe) => {
            return <Recipe key={recipe.id} student={recipe} />;
        });
    }

}

export default RecipeGridList;