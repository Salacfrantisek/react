import React, { useState } from 'react';
import Modal from 'react-modal';
import '../../style/css/recipeGridList.css';


const RecipeGridList = ({ recipes }) => {
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const openModal = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const closeModal = () => {
        setSelectedRecipe(null);
    };

    const handleImageError = (event) => {
        // Nahraďte neplatný obrázek jiným obrázkem nebo nějakým výchozím URL
        event.target.src = 'http://localhost:8000/storage/recipe_404.jpg';
    };

    return (
        <div className="recipe-grid">
            {recipes.map((recipe, index) => (
                <div key={index} className="recipe-grid-item" onClick={() => openModal(recipe)}>
                    <img
                        src={recipe.imgUri}
                        alt={recipe.name}
                        onError={handleImageError}
                    />
                    <h3>{recipe.name}</h3>
                </div>
            ))}

            <Modal
                isOpen={selectedRecipe !== null}
                onRequestClose={closeModal}
                contentLabel="Recipe Details"
            >
                {selectedRecipe && (
                    <div>
                        <h2>{selectedRecipe.name}</h2>
                        <p>{selectedRecipe.description}</p>
                        {/* Další informace o receptu */}
                        <button onClick={closeModal}>Zavřít</button>
                        <button>Upravit</button>
                        <button>Smazat</button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default RecipeGridList;


/*
import React from 'react';



const RecipeGridList = ({ recipes }) => {
    return (
        <div>
            <h2>Recepty v mřížce?!</h2>
            { Vykreslení receptů v mřížce }
            <div className="grid-container">
                {recipes.map((recipe) => (
                    <div key={recipe.name} className="recipe-item">
                        <img src={recipe.imgUri} alt={recipe.name} />
                        <h3>{recipe.name}</h3>
                        {Další informace o receptu }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeGridList;
*/