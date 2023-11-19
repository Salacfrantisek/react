import React from 'react';



const RecipeGridList = ({ recipes }) => {
    return (
        <div>
            <h2>Recepty v mřížce?!</h2>
            {/* Vykreslení receptů v mřížce */}
            <div className="grid-container">
                {recipes.map((recipe) => (
                    <div key={recipe.name} className="recipe-item">
                        <img src={recipe.imgUri} alt={recipe.name} />
                        <h3>{recipe.name}</h3>
                        {/* Další informace o receptu */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeGridList;