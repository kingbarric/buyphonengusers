import { MobileMenuItem } from '../app/shared/interfaces/mobile-menu-item';

export const mobileMenu: MobileMenuItem[] = [
    { type: 'link', label: 'Home', url: '/' },

    // {
    //     type: 'link', label: 'Categories', url: '/shop/catalog', children: [
    //         {
    //             type: 'link', label: 'Power Tools', url: '/shop/catalog', children: [
    //                 { type: 'link', label: 'Engravers', url: '/shop/catalog' },
    //                 { type: 'link', label: 'Wrenches', url: '/shop/catalog' },
    //                 { type: 'link', label: 'Wall Chaser', url: '/shop/catalog' },
    //                 { type: 'link', label: 'Pneumatic Tools', url: '/shop/catalog' }
    //             ]
    //         },
    //         {
    //             type: 'link', label: 'Machine Tools', url: '/shop/catalog', children: [
    //                 { type: 'link', label: 'Thread Cutting', url: '/shop/catalog' },
    //                 { type: 'link', label: 'Chip Blowers', url: '/shop/catalog' },
    //                 { type: 'link', label: 'Sharpening Machines', url: '/shop/catalog' },
    //                 { type: 'link', label: 'Pipe Cutters', url: '/shop/catalog' },
    //                 { type: 'link', label: 'Slotting machines', url: '/shop/catalog' },
    //                 { type: 'link', label: 'Lathes', url: '/shop/catalog' }
    //             ]
    //         }
    //     ]
    // },

    // {
    //     type: 'link', label: 'Top Brands', url: '/shop/catalog', children: [
    //         {
    //             type: 'link', label: 'Power Tools', url: '/shop/catalog', children: [
    //                 { type: 'link', label: 'Engravers', url: '/shop/catalog' },
    //                 { type: 'link', label: 'Wrenches', url: '/shop/catalog' },
    //                 { type: 'link', label: 'Wall Chaser', url: '/shop/catalog' },
    //                 { type: 'link', label: 'Pneumatic Tools', url: '/shop/catalog' }
    //             ]
    //         },
    //         {
    //             type: 'link', label: 'Machine Tools', url: '/shop/catalog', children: [
    //                 { type: 'link', label: 'Thread Cutting', url: '/shop/catalog' },
    //                 { type: 'link', label: 'Chip Blowers', url: '/shop/catalog' },
    //                 { type: 'link', label: 'Sharpening Machines', url: '/shop/catalog' },
    //                 { type: 'link', label: 'Pipe Cutters', url: '/shop/catalog' },
    //                 { type: 'link', label: 'Slotting machines', url: '/shop/catalog' },
    //                 { type: 'link', label: 'Lathes', url: '/shop/catalog' }
    //             ]
    //         }
    //     ]
    // },
    { type: 'link', label: 'Shop', url: '/shop/catalog' },
    { type: 'link', label: 'Cart', url: '/shop/cart' },
    { type: 'link', label: 'Wishlist', url: '/shop/wishlist' },
    { type: 'link', label: 'Dashboard', url: '/account/dashboard' },
    { type: 'link', label: 'Track order', url: '/shop/track-order' },
    { type: 'link', label: 'Login', url: '/account/login' },
    { type: 'link', label: 'FAQ', url: '/faq' },
    { type: 'link', label: 'Blog', url: '/blog/category-classic' },
    { type: 'link', label: 'Contact Us', url: '/contact-us' },

];
