import { Component } from '@angular/core';
import { BackendService, Sample, User, Status, NewSample} from '../services/Service';
//import { Sample } from '../services/Service';
import { OnInit } from '@angular/core';

@Component({
    selector: 'my-app',
    providers: [BackendService, Sample, User, Status, NewSample],
    templateUrl: '../views/app.component.html',
    styleUrls: [ '../style/app.component.css'],
    moduleId: module.id
})
export class AppComponent implements OnInit {
    constructor(private backendService: BackendService) { }
    private self = this;
    public name = 'GbyG Code';
    public samples: Sample[];
    public statuses: Status[];
    public newSample: NewSample = { Barcode: "", StatusId: 0, UserId: 0};
    public users: User[];
    public error: string = null;
    public message: string = null;
    public samplesLoaded: boolean;
    

    public selectedStatus: number[];
    public userSearchString: string;

    //Output all Samples, status, name of user, COMPLETED
    //Output all Samples with a given Status COMPLETED
    //Output all samples created by any user that contains a given string in their name COMPLETED
    //Create a new Sample with associated status and user. Return HTTP OK or an Error

    ngOnInit(): void {
        this.selectedStatus = [0,1,2,3];
        this.getSamples();
        this.getDropdowns();
    }

    public onFormSubmit(): void{
        var self = this;
        if (this.validateForm()) {
            this.backendService.createSample(this.newSample)
                .then(function () {
                    self.getSamples();
                    self.message = "Sample Successfully Added";
                    setTimeout(function () {
                        self.message = null;
                    }, 5000);
                })
                .catch(error => this.error = error);
        }
    }

    public resetFrom(): void {
        this.message = null;
        this.error = null;
        this.newSample.Barcode = "";
        this.newSample.StatusId = 0;
        this.newSample.UserId = 0;
    }

    private getSamples(): void {
        var self = this;
        this.backendService.getSamples()
            .then(function (response) {
                self.samples = response;
                self.samplesLoaded = true;
            })
            .catch(error => this.error = error);
    }

    private getDropdowns(): void {
        this.backendService.getStatuses()
            .then(statuses => this.statuses = statuses)
            .catch(error => this.error = error);

        this.backendService.getUsers()
            .then(users => this.users = users)
            .catch(error => this.error = error);
    }

    private validateForm(): boolean {
        var barcode = this.newSample.Barcode;
        if (barcode != undefined && barcode.length != 6) {
            this.error = "Barcode must be at least 6 digits long";
            return false;
        }

        var barcodeCheck = this.samples.filter(function (e, i, a) { return e.Barcode === barcode}).length;

        if (barcodeCheck > 0) {
            this.error = "Barcode already exists";
            return false;
        }

        if (this.newSample.StatusId == undefined) {
            this.error = "Must choose a status";
            return false;
        }

        if (this.newSample.UserId == undefined) {
            this.error = "Must choose a user";
            return false;
        }

        return true;
    }
}
