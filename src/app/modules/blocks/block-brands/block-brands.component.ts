import { Component, Input, ViewEncapsulation } from '@angular/core';
import { DirectionService } from '../../../shared/services/direction.service';
import { RootService } from '../../../shared/services/root.service';
import { Brand } from '../../../shared/interfaces/brand';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-block-brands',
    templateUrl: './block-brands.component.html',
    styleUrls: ['./block-brands.component.scss']
})
export class BlockBrandsComponent {
    @Input() brands: Brand[] = [];

    carouselOptions:OwlOptions = {
        items: 6,
        nav: false,
        // dots: true,
        loop: true,
        lazyLoad:true,
        responsive: {
            1100: {items: 6},
            920: {items: 5},
            680: {items: 4},
            500: {items: 3},
            0: {items: 2}
        },
        rtl: this.direction.isRTL(),
        navText : ['<div class=""><i class="fa fa-angle-left position-absolute" aria-hidden="true"></i>','<i class="fa fa-angle-right position-absolute" aria-hidden="true"></i></div>'],
    };

    constructor(
        public root: RootService,
        private direction: DirectionService
    ) { }
}
