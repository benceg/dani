import { format, parse } from 'fecha';

const formatDate = (date, pattern = 'YYYY', inputPattern = 'YYYY-MM-DD') => format(parse(date, inputPattern), pattern);

export default formatDate;
