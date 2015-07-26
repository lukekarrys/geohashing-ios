import zeroFill from 'zero-fill';

export default (d) => {
  const yyyy = d.getFullYear();
  const mm = d.getMonth() + 1;
  const dd = d.getDate();
  return `${yyyy}-${zeroFill(2, mm)}-${zeroFill(2, dd)}`;
};
