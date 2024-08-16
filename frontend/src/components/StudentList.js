import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/StudentList.css';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/students') // Corrected the URL
            .then(res => res.json())
            .then(data => setStudents(data))
            .catch(err => console.error(err));
    }, []);

    const handleGoBack = () => {
        navigate(-1); // Retourner à la page précédente
    };

    return (
        <div className="student-list-container">
            <button className="back-button" onClick={handleGoBack}>Retour</button>
            <h2>Liste des étudiants inscrits</h2>
            <ul className="student-list">
                {students.map(student => (
                    <li key={student.id}>
                       {student.id} - {student.name} - {student.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;
