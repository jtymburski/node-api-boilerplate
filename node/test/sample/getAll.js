const _ = require('lodash');

const SampleCreate = require('./create');

module.exports = {
  request: request,
  test: test
};

// EXPORTS

function request(chai, app, config) {
  return chai.request(app)
      .get(`${config.BASE_PATH}/sample`);
}

function test(chai, app, config) {
  describe('/GET sample', () => {

    // Create a starting set of test announcements
    const minCount = 2;
    before((done) => {
      createRecursive(chai, app, config, minCount, done);
    });

    // Succeed on normal fetch
    it('it should succeed to fetch all sample objects', (done) => {
      execute(chai, app, config, (infoSet) => {
        for (let info in infoSet) {
          info.should.be.a('object');
          info.should.have.property('id');
          info.should.have.property('name');
          info.should.have.property('description');
        }
        done();
      });
    });
  });
}

// INTERNALS

function createRecursive(chai, app, config, max, done, count) {
  if (!count) count = 0;
  if (count >= max) {
    done();
    return;
  }

  SampleCreate.execute(chai, app, config, (newInfo) => {
    createRecursive(chai, app, config, max, done, count + 1);
  });
}

function execute(chai, app, config, done) {
  request(chai, app, config)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      done(res.body);
    });
}
