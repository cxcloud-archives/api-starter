import * as controllersObj from './all';

export default Object.keys(controllersObj).map(
  key => (controllersObj as any)[key]
);
