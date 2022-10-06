import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

const should = chai.should();

chai.use(chaiHttp);

describe('Post Profile Service', () => {
    it('should create a profile and send to database', (done) => {
        const profile = {
        firstName: 'Test1',
        lastName: 'lastName',
        country : 'US',
        city: 'Winnsboro',
        region: 'Texas',
        zipCode: 75494,
        keywords: ["keywords"],};
        chai.request(app)
            .post('/api/profiles')
            .send(profile)
            .end((err, res) => {
                chai.request(app)
                .get('/api/profiles')
                .end((err, res) => {
                    res.status.should.equal(200);
                    done();
                })
            })
    })

})

describe('Get All Profiles Service', () => {
    it('should return all profiles and makes sure not null', (done) => {
        chai.request(app)
            .get('/api/profiles')
            .end((err, res) => {
                res.status.should.equal(200);
                assert.exists(res.body, 'profiles is neither `null` nor `undefined`');
                done();
            })
    })

})

describe('Get All Profiles Service', () => {
    it('should return all profiles and check type', (done) => {
        chai.request(app)
            .get('/api/profiles')
            .end((err, res) => {
                res.status.should.equal(200);
                assert.typeOf(res.body, 'array')
                done();
            })
    })

})

describe('Get All Profiles Service', () => {
    it('should return all profiles and check if includes id', (done) => {
        chai.request(app)
            .get('/api/profiles')
            .end((err, res) => {
                res.status.should.equal(200);
                assert.hasAnyKeys(res.body, "1")
                done();
            })
    })

})

describe('Update a Profile Service', () => {
    it('partially update a profile - Completed to Active status', (done) => {
        chai.request(app)
            .patch('/api/profiles')
            .send({  firstName: "Olen" , where: {id: "1"}})
            .end((err, res) => {
                chai.request(app)
                .get('/api/profiles')
                .end((err, res) => {
                    res.status.should.equal(200);
                    done();
                })
        })
    })
})


// ------