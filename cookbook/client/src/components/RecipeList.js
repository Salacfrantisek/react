import React, {useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Icon from "@mdi/react";
import { mdiTable, mdiViewGridOutline } from "@mdi/js";
import RecipeGridList from "./layouts/RecipeGridList"//"./RecipeGridList";

function RecipeList(props) {


    const [viewType, setViewType] = useState("grid");
    const isGrid = viewType === "grid";

    return (
        <div>
            <Navbar bg="light">
                <div className="container-fluid">
                    <Navbar.Brand>Recepty</Navbar.Brand>
                    <Button
                        variant="outline-primary"
                        onClick={() =>
                            setViewType((currentState) => {
                                if (currentState === "grid") return "table";
                                else return "grid";
                            })
                        }
                    >
                        <Icon size={1} path={isGrid ? mdiTable : mdiViewGridOutline}/>{" "}
                        {isGrid ? "Tabulka" : "Grid"}
                    </Button>
                </div>
            </Navbar>
            {isGrid ? (
                <RecipeList recipeList={props.recipeList}/>
            ) : (
                <RecipeGridList recipeList={props.recipeList}/>
            )}
        </div>);
}
export default RecipeList;

/* DEPRECATED:
    function getRecipeList(recipeList) {
        return recipeList.map((recipe) => {
            return <Recipe key={recipe.id} recipe={recipe} />;
        });
    }
    return getRecipeList(props.recipeList);
}
 */