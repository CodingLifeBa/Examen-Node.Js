import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/AddStudent.css';

const AddStudent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        })
        .then(res => res.json())
        .then(data => {
            console.log('Étudiant ajouté:', data);
            setName('');
            setEmail('');
        })
        .catch(err => console.error(err));
    };

    const handleGoBack = () => {
        navigate(-1); // Retourner à la page précédente
    };

    return (
        <div className="add-student-container">
            <button className="back-button" onClick={handleGoBack}>Retour</button>
            <h2>Ajouter un étudiant</h2>
            <form className="add-student-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddStudent;
