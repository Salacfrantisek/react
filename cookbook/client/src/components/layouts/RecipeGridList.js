import React, { useState } from 'react';
import Modal from 'react-modal';
import '../../style/css/recipeGridList.css';


const RecipeGridList = ({ recipes }) => {
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const openModal = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const openEditModal = () => {
        setIsEditing(true);
    };

    const closeModal = () => {
        setSelectedRecipe(null);
        setIsEditing(false);
    };

    const handleImageError = (event) => {
        // Nahraďte neplatný obrázek jiným obrázkem nebo nějakým výchozím URL
        event.target.src = 'http://localhost:8000/storage/recipe_404.jpg';
    };

    const handleInputChange = (event, field) => {
        const newValue = event.target.value;
        setSelectedRecipe((prevRecipe) => ({
            ...prevRecipe,
            [field]: newValue,
        }));
    };

    const saveChanges = async () => {
        try {
            const response = await fetch('http://localhost:8000/recipe/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedRecipe),
            });

            if (response.ok) {
                console.log('Recept byl úspěšně aktualizován.');
                setIsEditing(false);
                closeModal();
                window.location.reload();
                // Aktualizace seznamu receptů nebo dalších částí UI po úspěšné aktualizaci
            } else {
                console.error('Chyba při aktualizaci receptu:', response.status);
                // Zpracování chyby (zobrazení chybového hlášení nebo jiná logika)
            }
        } catch (error) {
            console.error('Chyba při komunikaci se serverem:', error);
            // Zpracování chyby při komunikaci se serverem
        }
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
                        <button onClick={openEditModal}>Upravit</button>
                        <button>Smazat</button>
                    </div>
                )}
            </Modal>
            {/* Modální okno pro úpravu */}
            <Modal
                isOpen={isEditing}
                onRequestClose={closeModal}
                contentLabel="Edit Recipe"
            >
                {selectedRecipe && (
                    <div>
                        <h2>Upravit recept: {selectedRecipe.name}</h2>
                        <form>
                            <div>
                                <label htmlFor="recipeName">Název:</label>
                                <input
                                    type="text"
                                    id="recipeName"
                                    value={selectedRecipe.name}
                                    // Přidejte onChange handler pro aktualizaci stavu při změně hodnoty
                                    onChange={(e) => handleInputChange(e, 'name')}
                                />
                            </div>
                            <div>
                                <label htmlFor="recipeDescription">Popis:</label>
                                <textarea
                                    id="recipeDescription"
                                    value={selectedRecipe.description}
                                    // Přidejte onChange handler pro aktualizaci stavu při změně hodnoty
                                    onChange={(e) => handleInputChange(e, 'description')}
                                />
                            </div>
                            {/* Další vstupní pole pro ostatní atributy receptu */}
                        </form>
                        <button onClick={closeModal}>Zrušit úpravy</button>
                        <button onClick={saveChanges}>Uložit změny</button>
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