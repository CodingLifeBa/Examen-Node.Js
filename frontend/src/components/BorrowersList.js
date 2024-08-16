import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/BorrowersList.css';

const BorrowersList = () => {
    const [bookId, setBookId] = useState('');
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/loans/book/${bookId}`) // Corrected the URL
            .then(res => res.json())
            .then(data => setStudents(data))
            .catch(err => console.error(err));
    };

    const handleGoBack = () => {
        navigate(-1); // Retourner à la page précédente
    };

    return (
        <div className="borrowers-list-container">
            <button className="back-button" onClick={handleGoBack}>Retour</button>
            <h2>Étudiants ayant emprunté un Livre</h2>
            <form className="borrowers-list-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="ID du Livre"
                    value={bookId}
                    onChange={e => setBookId(e.target.value)}
                />
                <button type="submit">Lister</button>
            </form>
            <ul>
                {students.map(student => (
                    <li key={student.id}>{student.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default BorrowersList;
