common = '--strict --require features --format rerun:@rerun.txt --format pretty --tags ~@skip --compiler es6:babel-core/register';

require('dotenv').config();

module.exports = {
  build: common + ' --format progress --compiler es6:babel-core/register',
  'default': common,
  'es5': '--tags ~@es6'
};
