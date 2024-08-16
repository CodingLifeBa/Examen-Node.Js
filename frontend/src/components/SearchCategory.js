import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/SearchCategory.css';

const SearchCategory = () => {
    const [category, setCategory] = useState('');
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/books/category?name=${category}`) // Utilisation correcte de l'URL
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => setBooks(data))
            .catch(err => console.error('Error fetching data:', err));
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="search-category-container">
            <button className="back-button" onClick={handleGoBack}>Retour</button>
            <h2>Rechercher une Catégorie de Livre</h2>
            <form className="search-category-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Catégorie (Scientifique, Informatique, Littérature)"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                />
                <button type="submit">Rechercher</button>
            </form>
            <ul className="book-list">
                {books.map(book => (
                    <li key={book.id}>{book.title} - {book.author}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchCategory;
