import { NavigationLink } from '../app/shared/interfaces/navigation-link';

export const navigation: NavigationLink[] = [
    { label: 'Home', url: '/' },
    {
        label: 'Top Brands', url: '/shop/catalog', menu: {
            type: 'megamenu',
            size: 'nl',
            columns: []
        }
    },
    { label: 'Shop', url: '/shop/catalog' },
    { label: 'Track Order', url: '/shop/track-order' },
    { label: 'Blog', url: 'https://blog.buyphoneng.ng', external: true,target:"_blank" },
    { label: 'FAQ', url: '/faq', target: "_blank" }
];
