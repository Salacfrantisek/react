import React from 'react';

const FunRecipeList = () =>{
    const imageUrl = 'http://localhost:8000/storage/veryspecialrecipe/letmecook.png';

    return (
        <div>
            <img src={imageUrl} alt="Description of the image" />
        </div>
    );
};

export default FunRecipeList;