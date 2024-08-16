import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ReturnBook.css';

const ReturnBook = () => {
    const [bookId, setBookId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/loans/return`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ book_id: bookId, student_id: studentId }),
        })
        .then(response => {
            console.log('Response:', response); // Ajoutez ceci pour voir la réponse du serveur
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message); });
            }
            return response.json(); // Ajoutez ceci pour traiter la réponse JSON
        })
        .then(data => {
            setMessage('Livre retourné avec succès.');
            setBookId('');
            setStudentId('');
        })
        .catch(error => {
            console.error('Erreur:', error);
            setMessage('Une erreur est survenue lors du retour du livre.');
        });
    };

    const handleGoBack = () => {
        navigate(-1); // Retourner à la page précédente
    };

    return (
        <div className="return-book-container">
            <button className="back-button" onClick={handleGoBack}>Retour</button>
            <h2>Retourner un livre</h2>
            <form className="return-book-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="ID du livre"
                    value={bookId}
                    onChange={e => setBookId(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="ID de l'étudiant"
                    value={studentId}
                    onChange={e => setStudentId(e.target.value)}
                    required
                />
                <button type="submit">Retourner</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default ReturnBook;
