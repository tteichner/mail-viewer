import {Component, Inject} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    version: string;

    constructor(@Inject('APP_VERSION') private versionToken: string) {
        this.version = this.versionToken;
    }
}
