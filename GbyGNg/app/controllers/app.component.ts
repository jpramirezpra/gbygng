import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: '../views/app.component.html',
    styleUrls: [ '../style/app.component.css'],
    moduleId: module.id
})
export class AppComponent {
    name = 'Angular 2';
}
