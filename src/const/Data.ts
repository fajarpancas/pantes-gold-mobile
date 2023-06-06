import Colors from '../themes/Colors';

export const STATUS = [
  {
    name: 'New',
    color: Colors.outlineBase,
    textColor: Colors.fontBlack,
  },
  {
    name: 'Proses',
    color: `${Colors.yellow}40`,
    textColor: Colors.fontBlack,
  },
  {
    name: 'Beli',
    color: Colors.yellow,
    textColor: Colors.fontBlack,
  },
  {
    name: 'Kirim',
    color: Colors.greenlight,
    textColor: Colors.fontBlack,
  },
  {name: 'Terima', color: Colors.primary, textColor: Colors.white},
  {name: 'Close', color: 'red', textColor: Colors.white},
];
