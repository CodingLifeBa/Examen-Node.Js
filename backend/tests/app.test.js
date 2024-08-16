const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
chai.use(chaiHttp);
const expect = chai.expect;

describe('Bibliothèque API', () => {
  
  describe('POST /books', () => {
    it('devrait ajouter un nouveau livre', (done) => {
      chai.request(app)
        .post('/books')
        .send({ title: 'Node.js Guide', author: 'Author A', category: 'Informatique' })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('id');
          done();
        });
    });
  });

  describe('GET /books', () => {
    it('devrait lister tous les livres disponibles', (done) => {
      chai.request(app)
        .get('/books')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('POST /students', () => {
    it('devrait inscrire un nouvel étudiant', (done) => {
      chai.request(app)
        .post('/students')
        .send({ name: 'John Doe', email: 'john@example.com' })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('id');
          done();
        });
    });
  });

  describe('POST /loans', () => {
    it('devrait prêter un livre à un étudiant', (done) => {
      chai.request(app)
        .post('/loans')
        .send({ book_id: 1, student_id: 1 })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('loan_id');
          done();
        });
    });
  });
  
  // Ajoute d'autres tests pour les routes de retour de livre, recherche de livre, etc.

});
