import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/AddBook.css';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Données envoyées:', { title, author, category });

        fetch('http://localhost:5000/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author, category })
        })
        .then(response => {
            if (!response.ok) {
                console.log('Erreur de réponse:', response);
                throw new Error('Erreur lors de l\'ajout du livre');
            }
            return response.json();
        })
        .then(data => {
            console.log('Livre ajouté avec succès:', data);
            setMessage('Livre ajouté avec succès');
            setTitle('');
            setAuthor('');
            setCategory('');
        })
        .catch(error => {
            console.error('Erreur dans fetch:', error);
            setMessage('Une erreur est survenue lors de l\'ajout du livre');
        });
    };

    const handleGoBack = () => {
        navigate(-1); // Retourner à la page précédente
    };

    return (
        <div className="add-book-container">
            <button className="back-button" onClick={handleGoBack}>Retour</button>
            <h2>Ajouter un Livre</h2>
            <form className="add-book-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Titre du livre"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Auteur du livre"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Catégorie du livre"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                />
                <button type="submit">Ajouter</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default AddBook;
