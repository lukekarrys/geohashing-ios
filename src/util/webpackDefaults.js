import Defaulter from 'webpack/lib/WebpackOptionsDefaulter';

const defaulter = new Defaulter();
defaulter.process({});
const {defaults} = defaulter;

export default defaults;
