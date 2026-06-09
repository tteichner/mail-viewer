import {Component, Inject, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AppComponent implements OnInit {
    version: string;

    constructor(@Inject('APP_VERSION') private versionToken: string) {
        this.version = this.versionToken;
    }

    ngOnInit(): void {
        console.log('App started in version', this.version);
    }
}
