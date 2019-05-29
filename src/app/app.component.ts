

import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';


import { RunSystemCheck } from './system.check';
import { browserAndDeviceDetails } from './browserDevice.check';
import { IPassiveScoringFields } from './passive';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent  {


    form: FormGroup;
    payLoad = '';
    systemCheckResult: any;
    showResults = false;
passiveScoringArray: Array<IPassiveScoringFields>;
    constructor() {
      debugger;
         this.systemCheckResult = RunSystemCheck();
         if (this.systemCheckResult !== null && this.systemCheckResult['failure'].length > 0) {
         this.showResults = true;
         } else {
             console.log('success');
         }
         const data = browserAndDeviceDetails();
            const array = data.split('|');
            const browserPassiveData: IPassiveScoringFields = { name: 'WebBrowser', value: array[0] };
            const devicePassiveData: IPassiveScoringFields = { name: 'DeviceType/ScreenSize', value: array[1] };
            this.passiveScoringArray = new Array<IPassiveScoringFields>();
            this.passiveScoringArray.push(browserPassiveData);
            this.passiveScoringArray.push(devicePassiveData);
             console.log('success'+ this.passiveScoringArray);
    }

    ngOnInit(): void {
    }

    onSubmit() {
        const link = ['/home'];
        
    }
}
