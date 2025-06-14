export default function (number) {
  return new Intl.NumberFormat('ru-RU').format(number);
};
