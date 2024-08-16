import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/SearchStudent.css';

const SearchStudent = () => {
    const [search, setSearch] = useState('');
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/students/search?name=${search}`) // Corrected the URL
            .then(res => res.json())
            .then(data => setStudents(data))
            .catch(err => console.error(err));
    };

    const handleGoBack = () => {
        navigate(-1); // Retourner à la page précédente
    };

    return (
        <div className="search-student-container">
            <button className="back-button" onClick={handleGoBack}>Retour</button>
            <h2>Rechercher un étudiant</h2>
            <form className="search-student-form" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Nom de l'étudiant"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <button type="submit">Rechercher</button>
            </form>
            <ul className="student-list">
                {students.map(student => (
                    <li key={student.id}>{student.id} - {student.name} - {student.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchStudent;
