import {Component, Inject, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {
    version: string;

    constructor(@Inject('APP_VERSION') private versionToken: string) {
    }

    ngOnInit(): void {
        this.version = this.versionToken;
    }
}
