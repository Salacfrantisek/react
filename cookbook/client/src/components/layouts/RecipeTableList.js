import React from 'react';

const RecipeTableList = ({ recipes }) => {
    return (
        <div>
            <h2>Table View</h2>
            {/* Vykreslení receptů v seznamu */}
            <table>
                <thead>
                <tr>
                    <th>Název</th>
                    <th>Popis</th>
                    {/* Další záhlaví */}
                </tr>
                </thead>
                <tbody>
                {recipes.map((recipe) => (
                    <tr key={recipe.name}>
                        <td>{recipe.name}</td>
                        <td>{recipe.description}</td>
                        {/* Další informace o receptu */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecipeTableList;
