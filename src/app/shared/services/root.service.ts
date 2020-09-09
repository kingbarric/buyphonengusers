import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Category } from '../interfaces/category';
import { Brand } from '../interfaces/brand';

@Injectable({
    providedIn: 'root'
})
export class RootService {
    constructor() { }

    home(): string {
        return '/';
    }

    shop(): string {
        return `/shop/catalog`;
    }

    category(category:any): string {
        if (category.type === 'shop') {
            const basePath = this.shop();

            if ('slug' in category) {
                return `${basePath}`;
            }
            if ('id' in category) {
                return `${basePath}`;
            }

            throw Error('Provide category with "path", "slug" or "id".');
        }
        if (category.type === 'blog') {
            return this.blog();
        }

        throw Error('Provided category with unknown type.');
    }

    product(product:any): string {
        const basePath = '/shop/products';

        if ('slug' in product) {
            return `${basePath}/${product.slug}`;
        }
        if ('id' in product) {
            return `${basePath}/${product.title}`;
        }

        throw Error('Provide product with "slug" or "id".');
    }

    brand(brand: Partial<Brand>): string {
        return '/';
    }

    cart(): string {
        return '/shop/cart';
    }

    checkout(): string {
        return '/shop/cart/checkout';
    }

    wishlist(): string {
        return '/shop/wishlist';
    }

    blog(): string {
        return '/blog';
    }

    post(): string {
        return `/blog/post-classic`;
    }

    login(): string {
        return '/account/login';
    }

    terms(): string {
        return '/terms';
    }

    notFound(): string {
        return `/not-found`;
    }
}
