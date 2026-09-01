import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AppComponent implements OnInit {
    private versionToken = inject<string>('APP_VERSION' as any);

    version: string;

    constructor() {
        this.version = this.versionToken;
    }

    ngOnInit(): void {
        console.log('App started in version', this.version);
    }
}
