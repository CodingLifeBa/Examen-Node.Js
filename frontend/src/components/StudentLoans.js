import React, { useState } from 'react';
import './styles/StudentLoans.css'; // Ensure to create a corresponding CSS file

const StudentLoans = () => {
    const [studentId, setStudentId] = useState('');
    const [books, setBooks] = useState([]);
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/loans/student/${studentId}`) // Corrected the URL
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    setBooks(data);
                    setMessage('');
                } else {
                    setMessage('Aucun livre trouvé pour cet étudiant.');
                    setBooks([]);
                }
            })
            .catch(err => {
                console.error(err);
                setMessage('Une erreur est survenue.');
            });
    };

    return (
        <div className="student-loans-container">
            <h2>Livres Empruntés par un Étudiant</h2>
            <form className="student-loans-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="ID de l'Étudiant"
                    value={studentId}
                    onChange={e => setStudentId(e.target.value)}
                />
                <button type="submit">Lister</button>
            </form>
            {message && <p className="message">{message}</p>}
            <ul className="book-list">
                {books.map(book => (
                    <li key={book.id}>{book.title}</li>
                ))}
            </ul>
            <button className="return-button" onClick={() => window.history.back()}>Retour</button>
        </div>
    );
};

export default StudentLoans;
