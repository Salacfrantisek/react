import React, { useState } from 'react';

const Recipe = ({ recipe }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        // Implementujte logiku pro uložení změn na serveru
        // Poté přepněte zpět do režimu zobrazení
        setIsEditing(false);
    };

    return (
        <div>
            <h3>{isEditing ? <input type="text" value={recipe.name} /> : recipe.name}</h3>
            <p>{isEditing ? <textarea value={recipe.description} /> : recipe.description}</p>
            {/* Další informace o receptu */}
            {isEditing ? (
                <button onClick={handleSave}>Uložit</button>
            ) : (
                <button onClick={handleEdit}>Upravit</button>
            )}
        </div>
    );
};

export default Recipe;
