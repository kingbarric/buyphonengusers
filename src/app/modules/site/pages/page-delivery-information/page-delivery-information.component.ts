import { DirectionService } from './../../../../shared/services/direction.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-page-delivery-information',
    templateUrl: './page-delivery-information.component.html',
    styleUrls: ['./page-delivery-information.component.scss']
})
export class PageDeliveryInformationComponent implements OnInit {
    carouselOptions = {
        nav: false,
        dots: true,
        responsive: {
            580: { items: 3, margin: 32 },
            280: { items: 2, margin: 24 },
            0: { items: 1 }
        },
        rtl: this.direction.isRTL()
    };

    constructor(
        private direction: DirectionService
    ) { }

    ngOnInit(){}
}
