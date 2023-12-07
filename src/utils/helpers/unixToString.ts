export const getDate = (value: number) => {
  let unix = new Date(value);

  let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Augu',
    'Sep',
    'Okt',
    'Nov',
    'Des',
  ];

  let year = unix.getFullYear();
  let date = unix.getDate();
  let month = months[unix.getMonth()];

  return date + ' ' + month + ' ' + year;
};

export function yangLalu(value: string | number) {
  const dateValue = new Date(value).getTime() / 1000;

  const currDate = new Date().getTime() / 1000;

  const year = 31536000;
  const month = 2628288;
  const week = 604800;
  const day = 86400;
  const hour = 3600;
  const minutes = 60;

  const timeSpan = currDate - dateValue;

  let endtime = 0;

  if (timeSpan > year) {
    let endtime = timeSpan / year;
    return Math.floor(endtime) + ' tahun';
  }
  if (timeSpan > month) {
    let endtime = timeSpan / month;
    return Math.floor(endtime) + ' bulan';
  }
  if (timeSpan > week) {
    let endtime = timeSpan / week;
    return Math.floor(endtime) + ' minggu';
  }
  if (timeSpan > day) {
    let endtime = timeSpan / day;
    return Math.floor(endtime) + ' hari';
  }
  if (timeSpan > hour) {
    let endtime = timeSpan / hour;
    return Math.floor(endtime) + ' jam';
  }
  if (timeSpan > minutes) {
    let endtime = timeSpan / minutes;
    return Math.floor(endtime) + ' menit';
  }
  
  return 'Baru saja';
}
