import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import SearchBook from './components/SearchBook';
import SearchCategory from './components/SearchCategory';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import SearchStudent from './components/SearchStudent';
import LoanBook from './components/LoanBook';
import ReturnBook from './components/ReturnBook';
import BorrowersList from './components/BorrowersList';
import StudentLoans from './components/StudentLoans';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/search-book" element={<SearchBook />} />
          <Route path="/search-category" element={<SearchCategory />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/search-student" element={<SearchStudent />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/loan-book" element={<LoanBook />} />
          <Route path="/return-book" element={<ReturnBook />} />
          <Route path="/borrowers-list" element={<BorrowersList />} />
          <Route path="/student-loans" element={<StudentLoans />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
