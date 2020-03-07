import { getColor } from 'utils/colors';

export const revenue = {
  weekly_revenue: {
    labels: ['2/1','2/2','2/3','2/4','2/5','2/6','2/7'],
    datasets: [
      {
        label: 'Net Sales',
        borderColor: '#6a82fb',
        data: [51002,48023,23131,93242,203433,12312,43234],
        borderWidth: 1,
        fill:false
      },
      {
        label: 'Net Profits',
            borderColor: '#fc5c7d',
            data: [23423,18943,8003,40342,103433,6343,19230],
        borderWidth: 1,
        fill:false
      },
    ],
}
};

export const pie_sale = {
  datasets: [
    {
      data: [400,600,342,214,982],
      backgroundColor: [
        getColor('primary'),
        getColor('secondary'),
        getColor('success'),
        getColor('info'),
        getColor('danger'),
      ],
      label: 'Product Sales',
    },
  ],
  labels: ['Coke', 'Zero Coke', 'Sprite', 'Water', 'DR. Pepper']
};