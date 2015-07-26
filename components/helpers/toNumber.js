const numRegex = /[^-\d\.]/g;

const toNumber = (val) => {
  return Number((val + '').replace(numRegex, ''));
};

export default toNumber;
