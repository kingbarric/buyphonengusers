import { UtilService } from './../../../services/util.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {

    loading: boolean = true;
    constructor(private util: UtilService) {
      this.loading = this.util.toggleLoading;
    }

    ngOnInit() {
      // neologin.getAccount().then(console.log);
      this.loaderStatus();
    }

    loaderStatus() {
      this.util.loadingState().subscribe((res: boolean) => {
        this.loading = res;
      });
    }
}
