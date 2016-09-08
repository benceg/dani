import { format, parse } from 'fecha';

const formatDate = (date, pattern = 'YYYY') => format(parse(date, 'YYYY-MM-DD'), pattern);

export default formatDate;
