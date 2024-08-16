import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/SearchBook.css';

const SearchBook = () => {
    const [search, setSearch] = useState('');
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/books/search?title=${search}`) // Corrected the URL
            .then(res => res.json())
            .then(data => setBooks(data))
            .catch(err => console.error(err));
    };

    const handleGoBack = () => {
        navigate(-1); // Retourner à la page précédente
    };

    return (
        <div className="search-book-container">
            <button className="back-button" onClick={handleGoBack}>Retour</button>
            <h2>Rechercher un livre</h2>
            <form className="search-book-form" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Titre du livre"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <button type="submit">Rechercher</button>
            </form>
            <ul className="book-list">
                {books.map(book => (
                    <li key={book.id}>
                        {book.title} - {book.author}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBook;
