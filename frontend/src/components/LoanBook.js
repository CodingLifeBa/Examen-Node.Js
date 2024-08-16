import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/LoansBook.css';

const LoanBook = () => {
    const [bookId, setBookId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Vérifier si le livre est déjà prêté
        fetch(`http://localhost:5000/loans/book/${bookId}`)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    // Si le livre est déjà prêté, afficher un message d'erreur
                    setMessage('Ce livre est déjà emprunté par un autre étudiant.');
                } else {
                    // Si le livre n'est pas encore prêté, procéder au prêt
                    fetch('http://localhost:5000/loans', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ book_id: bookId, student_id: studentId })
                    })
                    .then(res => res.json())
                    .then(data => {
                        setMessage('Livre prêté avec succès.');
                        setBookId('');
                        setStudentId('');
                    })
                    .catch(err => {
                        console.error(err);
                        setMessage('Une erreur est survenue lors du prêt du livre.');
                    });
                }
            })
            .catch(err => {
                console.error(err);
                setMessage('Une erreur est survenue lors de la vérification du prêt.');
            });
    };

    const handleGoBack = () => {
        navigate(-1); // Retourner à la page précédente
    };

    return (
        <div className="loan-book-container">
            <button className="back-button" onClick={handleGoBack}>Retour</button>
            <h2>Prêter un livre</h2>
            <form className="loan-book-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="ID du livre"
                    value={bookId}
                    onChange={e => setBookId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="ID de l'étudiant"
                    value={studentId}
                    onChange={e => setStudentId(e.target.value)}
                />
                <button type="submit">Prêter</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default LoanBook;
