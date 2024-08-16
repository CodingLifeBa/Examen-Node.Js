import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/BookList.css';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/books')
            .then(response => {
                if (!response.ok) {
                    console.log('Erreur de réponse:', response);
                    throw new Error('Erreur lors de la récupération des données');
                }
                return response.json();
            })
            .then(data => {
                console.log('Données récupérées:', data);
                setBooks(data);
            })
            .catch(error => console.error('Erreur dans fetch:', error));
    }, []);

    const handleGoBack = () => {
        navigate(-1); // Retourner à la page précédente
    };

    return (
        <div className="book-list-container">
            <button className="back-button" onClick={handleGoBack}>Retour</button>
            <h2>Liste des livres disponibles</h2>
            <table className="book-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titre du Livre</th>
                        <th>Auteur</th>
                        <th>Catégorie</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookList;
