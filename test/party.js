const {expect} = require('chai');
const request = require('supertest');
const partyTest= require('./party');
const app = require('../app');


describe('partyTest', () => {
    describe('POST /party', () => {
      it('when a party is successfully created', (done) => {
        const partyDetails = {
          name: 'PDP',
          hqAdress: 'Abuja',
          
          logoUrl: 'www.google.com',
          
        };
        request(app)
          .post('/party')
          .send(partyDetails)
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.deep.equal({
              message: 'Party was created',
              createdParty: {
                id: 2,
                name: 'PDP',
                hqAdress: 'Abuja',
                logoUrl: 'www.google.com',
              },
            });
            done();
          });
      });
      it("when a party wasn't successfully created", (done) => {
        const partyDetail = {
          hqAddress: 'Abuja',
          logoUrl: 'http://www.google.com',
        };
        request(app).post('/party').send(partyDetail).end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.deep.equal({
            error: 'name is required',
          });
          done();
        });
      });
    })
  describe('GET /party', () => {
    it('Get all the parties created', (done) => {
        request(app).get('/party')
        .end((err,res)=>{
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.deep.equal({
              count:2,
              message:"This are the parties",
              parties: [
                {
                    "name": "APC",
                    "Headquaters": "London",
                    "LogoUrl": "www.allparty.com",
                    "id": 1,
                    "request": {
                        "type": "GET",
                        "url": "http://localhost:3000/party/1"
                  
                  }
                },
                  {
                    "name": "PDP",
                    "Headquaters": "Abuja",
                    "LogoUrl": "www.google.com",
                    "id": 2,
                    "request": {
                        "type": "GET",
                        "url": "http://localhost:3000/party/2"
                  
                  }
                }
              ],
            });
   
            done();
        });
  });
});
});
