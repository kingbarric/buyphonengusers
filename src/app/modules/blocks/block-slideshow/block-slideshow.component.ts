import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DirectionService } from '../../../shared/services/direction.service';

@Component({
    selector: 'app-block-slideshow',
    templateUrl: './block-slideshow.component.html',
    styleUrls: ['./block-slideshow.component.scss']
})
export class BlockSlideshowComponent {
    @Input() withDepartments = false;

    options = {
        nav: false,
        dots: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
            0: { items: 1 }
        },
        rtl: this.direction.isRTL()
    };

    slides = [
        {
            title: 'Big choice of<br>Plumbing products',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Etiam pharetra laoreet dui quis molestie.',
            image_classic: 'assets/images/_home/buyphoneSlider1.png',
            image_full: 'assets/images/_home/buyphoneSlider1.png',
            image_mobile: 'assets/images/_home/buyphoneSlider1.png'
        },
        {
            title: 'Screwdrivers<br>Professional Tools',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Etiam pharetra laoreet dui quis molestie.',
            image_classic: 'assets/images/_home/buyphoneSlider2.jpg',
            image_full: 'assets/images/_home/buyphoneSlider2.jpg',
            image_mobile: 'assets/images/_home/buyphoneSlider2.jpg'
        },
        {
            title: 'One more<br>Unique header',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Etiam pharetra laoreet dui quis molestie.',
            image_classic: 'assets/images/_home/buyphoneSlider3.jpg',
            image_full: 'assets/images/_home/buyphoneSlider3.jpg',
            image_mobile: 'assets/images/_home/buyphoneSlider3.jpg'
        },
        {
            title: 'One more<br>Unique header',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Etiam pharetra laoreet dui quis molestie.',
            image_classic: 'assets/images/_home/slider1.png',
            image_full: 'assets/images/_home/slider1.png',
            image_mobile: 'assets/images/_home/slider1.png'
        },
        {
            title: 'Big choice of<br>Plumbing products',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Etiam pharetra laoreet dui quis molestie.',
            image_classic: 'assets/images/_home/slider3.png',
            image_full: 'assets/images/_home/slider3.png',
            image_mobile: 'assets/images/_home/slider3.png'
        },
        // {
        //     title: 'Big choice of<br>Plumbing products',
        //     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Etiam pharetra laoreet dui quis molestie.',
        //     image_classic: 'assets/images/_home/buyphoneSlider4.png',
        //     image_full: 'assets/images/_home/buyphoneSlider4.png',
        //     image_mobile: 'assets/images/_home/buyphoneSlider4.png'
        // },
    ];

    constructor(
        public sanitizer: DomSanitizer,
        private direction: DirectionService
    ) { }
}
