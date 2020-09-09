import { CrudService } from './../../../../services/crud.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-track-order',
    templateUrl: './page-track-order.component.html',
    styleUrls: ['./page-track-order.component.scss']
})
export class PageTrackOrderComponent implements OnInit {
    ref: string = '';
    buttonBusy: boolean = false;
    alertMsg:string =null
alertType:'primary'| 'success' | 'danger'|'info'
    constructor(private crud: CrudService) { }
    ngOnInit() { }

    track() {
        this.buttonBusy = true
        this.crud.getRequestNoAuth(`exp/findstatus/${this.ref}`).then((res: any) => {
            console.log(res);
            this.buttonBusy = false
        }).catch((err: any) => {
            console.log(err);
            this.alertType = 'danger'
            this.buttonBusy = false
            if(err.error == 0){
this.alertMsg = "Unknown Error"
            }else{
                this.alertMsg = err.error.message
            }
        })
    }
}
