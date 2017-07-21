import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';


import 'rxjs/add/operator/toPromise';

//Ok(db.Samples.Select(s => new { s.SampleId, s.User.FirstName, s.User.LastName, s.Barcode, s.Status.StatusName, s.User.UserId, s.Status.StatusId })
//Models
@Injectable()
export class Sample {
    SampleId: number;
    Barcode: string;
    FirstName: string;
    LastName: string;
    StatusName: string;
    UserId: number;
    StatusId: number;
    CreatedAt: string;
}

@Injectable()
export class NewSample {
    Barcode: string;
    UserId: number;
    StatusId: number;
}

@Injectable()
export class User {
    UserId: number;
    FirstName: string;
    LastName: string;
}

@Injectable()
export class Status {
    StatusId: number;
    StatusName: string;
}


//Backend Service
@Injectable()
export class BackendService {
    private samplesUrl = 'api/samples';
    private userUrl = 'api/users';
    private statusUrl = 'api/status';
    private createSampleUrl = 'api/samples';

    constructor(private http: Http) { }


    getSamples(): Promise<Sample[]> {
        return this.http.get(this.samplesUrl)
            .toPromise()
            .then(this.preSample)
            //.then(response => response.json().data as Sample[])
            .catch(this.handleError);
    }

    getStatuses(): Promise<Status[]> {
        return this.http.get(this.statusUrl)
            .toPromise()
            .then(res => res.json().data as Status[])
            .catch(this.handleError);
    }

    getUsers(): Promise<User[]> {
        return this.http.get(this.userUrl)
            .toPromise()
            .then(res => res.json().data as User[])
            .catch(this.handleError);
    }

    createSample(sample: NewSample): Promise<any> {
        return this.http.post(this.createSampleUrl, sample)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    private preSample(response: any): Promise<Sample[]> {
        //add data transformation logic if necessary
        return Promise.resolve(response.json().data as Sample[]);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error.json().Message);
        return Promise.reject(error.json().Message || error.toString());
    }
}