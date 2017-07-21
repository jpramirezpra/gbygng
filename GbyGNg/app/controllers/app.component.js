"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Service_1 = require("../services/Service");
var AppComponent = (function () {
    function AppComponent(backendService) {
        this.backendService = backendService;
        this.self = this;
        this.name = 'GbyG Code';
        this.newSample = { Barcode: "", StatusId: 0, UserId: 0 };
        this.error = null;
        this.message = null;
    }
    //Output all Samples, status, name of user, COMPLETED
    //Output all Samples with a given Status COMPLETED
    //Output all samples created by any user that contains a given string in their name COMPLETED
    //Create a new Sample with associated status and user. Return HTTP OK or an Error
    AppComponent.prototype.ngOnInit = function () {
        this.selectedStatus = [0, 1, 2, 3];
        this.getSamples();
        this.getDropdowns();
    };
    AppComponent.prototype.onFormSubmit = function () {
        var _this = this;
        var self = this;
        if (this.validateForm()) {
            this.backendService.createSample(this.newSample)
                .then(function () {
                debugger;
                self.getSamples();
                self.message = "Sample Successfully Added";
                setTimeout(function () {
                    self.message = null;
                }, 10000);
            })
                .catch(function (error) { return _this.error = error; });
        }
    };
    AppComponent.prototype.resetFrom = function () {
        this.message = "Test This";
        this.error = null;
        this.newSample.Barcode = "";
        this.newSample.StatusId = 0;
        this.newSample.UserId = 0;
    };
    AppComponent.prototype.getSamples = function () {
        var _this = this;
        var self = this;
        this.backendService.getSamples()
            .then(function (response) {
            self.samples = response;
            self.samplesLoaded = true;
        })
            .catch(function (error) { return _this.error = error; });
    };
    AppComponent.prototype.getDropdowns = function () {
        var _this = this;
        this.backendService.getStatuses()
            .then(function (statuses) { return _this.statuses = statuses; })
            .catch(function (error) { return _this.error = error; });
        this.backendService.getUsers()
            .then(function (users) { return _this.users = users; })
            .catch(function (error) { return _this.error = error; });
    };
    AppComponent.prototype.validateForm = function () {
        var barcode = this.newSample.Barcode;
        if (barcode != undefined && barcode.length != 6) {
            this.error = "Barcode must be at least 6 digits long";
            return false;
        }
        var barcodeCheck = this.samples.filter(function (e, i, a) { return e.Barcode === barcode; }).length;
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
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        providers: [Service_1.BackendService, Service_1.Sample, Service_1.User, Service_1.Status, Service_1.NewSample],
        templateUrl: '../views/app.component.html',
        styleUrls: ['../style/app.component.css'],
        moduleId: module.id
    }),
    __metadata("design:paramtypes", [Service_1.BackendService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map