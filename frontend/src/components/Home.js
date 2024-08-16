import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bienvenue à la Bibliothèque</h1>
      <p>Gérez facilement vos livres et étudiants.</p>
      <div className="links-container">
        <Link to="/add-book" className="home-link">Ajouter un Livre</Link>
        <Link to="/search-book" className="home-link">Rechercher un Livre</Link>
        <Link to="/search-category" className="home-link">Rechercher par Catégorie</Link>
        <Link to="/books" className="home-link">Lister les Livres</Link>
        <Link to="/add-student" className="home-link">Inscrire un Étudiant</Link>
        <Link to="/search-student" className="home-link">Rechercher un Étudiant</Link>
        <Link to="/students" className="home-link">Lister les Étudiants</Link>
        <Link to="/loan-book" className="home-link">Prêter un Livre</Link>
        <Link to="/return-book" className="home-link">Rendre un Livre</Link>
        <Link to="/borrowers-list" className="home-link">Liste des Emprunteurs</Link>
        <Link to="/student-loans" className="home-link">Livres Empruntés par un Étudiant</Link>
      </div>
    </div>
  );
};

export default Home;
