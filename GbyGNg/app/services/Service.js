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
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
//Ok(db.Samples.Select(s => new { s.SampleId, s.User.FirstName, s.User.LastName, s.Barcode, s.Status.StatusName, s.User.UserId, s.Status.StatusId })
//Models
var Sample = (function () {
    function Sample() {
    }
    return Sample;
}());
Sample = __decorate([
    core_1.Injectable()
], Sample);
exports.Sample = Sample;
var NewSample = (function () {
    function NewSample() {
    }
    return NewSample;
}());
NewSample = __decorate([
    core_1.Injectable()
], NewSample);
exports.NewSample = NewSample;
var User = (function () {
    function User() {
    }
    return User;
}());
User = __decorate([
    core_1.Injectable()
], User);
exports.User = User;
var Status = (function () {
    function Status() {
    }
    return Status;
}());
Status = __decorate([
    core_1.Injectable()
], Status);
exports.Status = Status;
//Backend Service
var BackendService = (function () {
    function BackendService(http) {
        this.http = http;
        this.samplesUrl = 'api/samples';
        this.userUrl = 'api/users';
        this.statusUrl = 'api/status';
        this.createSampleUrl = 'api/samples';
    }
    BackendService.prototype.getSamples = function () {
        return this.http.get(this.samplesUrl)
            .toPromise()
            .then(this.preSample)
            .catch(this.handleError);
    };
    BackendService.prototype.getStatuses = function () {
        return this.http.get(this.statusUrl)
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    BackendService.prototype.getUsers = function () {
        return this.http.get(this.userUrl)
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    BackendService.prototype.createSample = function (sample) {
        return this.http.post(this.createSampleUrl, sample)
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    BackendService.prototype.preSample = function (response) {
        //add data transformation logic if necessary
        return Promise.resolve(response.json().data);
    };
    BackendService.prototype.handleError = function (error) {
        console.error('An error occurred', error.json().Message);
        return Promise.reject(error.json().Message || error.toString());
    };
    return BackendService;
}());
BackendService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], BackendService);
exports.BackendService = BackendService;
//# sourceMappingURL=Service.js.map