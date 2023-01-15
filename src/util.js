import dayjs from 'dayjs';

export const fillEmptyColumns = (columns, start, end) => {
  const filledColumns = columns.slice(0);

  const startDay = dayjs(start).get('day');
  for (let i = 1; i <= startDay; i += 1) {
    const date = dayjs(start).subtract(i, 'day');
    filledColumns.unshift(date);
  }

  const endDay = dayjs(end).get('day');

  for (let i; i <= 6 - endDay; i += 1) {
    const date = dayjs(end).add(i, 'day');
    filledColumns.push(date);
  }

  return filledColumns;
};

export const getCalendarColumns = now => {
  const start = dayjs(now).startOf('month');
  const end = dayjs(now).endOf('month');
  const endDate = dayjs(end).get('date');

  const columns = [];
  for (let i = 0; i < endDate; i += 1) {
    const date = dayjs(start).add(i, 'day');
    columns.push(date);
  }

  const filledColumns = fillEmptyColumns(columns, start, end);

  return filledColumns;
};
