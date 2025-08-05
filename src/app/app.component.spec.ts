import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from "@angular/router";

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterModule.forRoot([]),
                BrowserModule,
            ],
            declarations: [
                AppComponent
            ],
            providers: [
                provideHttpClient(withInterceptorsFromDi()),
                {
                    provide: 'APP_VERSION',
                    useValue: '1.0.0'
                }
            ]
        }).compileComponents();
    });

    it('should create app and render title', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('span').textContent).toContain('Version: 1.0.0');
    });
});
