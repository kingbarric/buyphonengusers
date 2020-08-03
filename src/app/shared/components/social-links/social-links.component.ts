import { Component, HostBinding, Input } from '@angular/core';
import { theme } from '../../../../data/theme';

export interface SocialLinksItem {
    type: string;
    url: string;
    icon: string;
}

export type SocialLinksShape = 'circle' | 'rounded';

@Component({
    selector: 'app-social-links',
    templateUrl: './social-links.component.html',
    styleUrls: ['./social-links.component.scss']
})
export class SocialLinksComponent {
    theme = theme;

    items: SocialLinksItem[] = [
        {type: 'facebook', url: 'https://facebook.com/BuyPhoneng-104723187982532', icon: 'fab fa-facebook-f'},
        {type: 'twitter', url: 'https://twitter.com/BuyphoneN', icon: 'fab fa-twitter'},
        {type: 'youtube', url: 'https://www.youtube.com/channel/UCWNIHN7rpQSkJTKEU2sb_Zg?view_as=subscriber', icon: 'fab fa-youtube'},
        {type: 'instagram', url: 'https://www.instagram.com/buyphoneng', icon: 'fab fa-instagram'},
        // {type: 'rss', url: this.theme.author.profile_url, icon: 'fas fa-rss'},
    ];

    @Input() shape: SocialLinksShape;

    @HostBinding('class.social-links') classSocialLinks = true;

    @HostBinding('class.social-links--shape--circle') get classSocialLinksShapeCircle(): boolean { return this.shape === 'circle'; }

    @HostBinding('class.social-links--shape--rounded') get classSocialLinksShapeRounded(): boolean { return this.shape === 'rounded'; }

    constructor() { }
}
