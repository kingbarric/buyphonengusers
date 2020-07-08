import { NavigationLink } from '../app/shared/interfaces/navigation-link';

export const navigation: NavigationLink[] = [
    {label: 'Home', url: '/'},
    {label: 'Top Brands', url: '/shop/catalog', menu: {
        type: 'megamenu',
        size: 'nl',
        columns: [
            {size: 6, items: [
                {label: 'Tecno', url: '/shop/catalog', items: [
                    {label: 'Engravers', url: '/shop/catalog'},
                    {label: 'Wrenches', url: '/shop/catalog'},
                    {label: 'Wall Chaser', url: '/shop/catalog'},
                    {label: 'Pneumatic Tools', url: '/shop/catalog'}
                ]},
                {label: 'Iphone', url: '/shop/catalog', items: [
                    {label: 'Thread Cutting', url: '/shop/catalog'},
                    {label: 'Chip Blowers', url: '/shop/catalog'},
                    {label: 'Sharpening Machines', url: '/shop/catalog'},
                    {label: 'Pipe Cutters', url: '/shop/catalog'},
                    {label: 'Slotting machines', url: '/shop/catalog'},
                    {label: 'Lathes', url: '/shop/catalog'}
                ]}
            ]},
            {size: 6, items: [
                {label: 'Infinix', url: '/shop/catalog', items: [
                    {label: 'Screwdrivers', url: '/shop/catalog'},
                    {label: 'Handsaws', url: '/shop/catalog'},
                    {label: 'Knives', url: '/shop/catalog'},
                    {label: 'Axes', url: '/shop/catalog'},
                    {label: 'Multitools', url: '/shop/catalog'},
                    {label: 'Paint Tools', url: '/shop/catalog'}
                ]},
                {label: 'Gionee', url: '/shop/catalog', items: [
                    {label: 'Motor Pumps', url: '/shop/catalog'},
                    {label: 'Chainsaws', url: '/shop/catalog'},
                    {label: 'Electric Saws', url: '/shop/catalog'},
                    {label: 'Brush Cutters', url: '/shop/catalog'}
                ]}
            ]}
        ]
    }},
    {label: 'Shop', url: '/shop/catalog'},
      {label: 'Blog', url: '/blog'},
    { label: 'Help', url: '/site' }
];
