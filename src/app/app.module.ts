import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {MailBodyComponent} from './mail-body/mail-body.component';
import {SafeHtmlPipe} from './pipes/safe-html.pipe';
import {environment} from '../environments/environment';

const routes: Routes = [
    {path: 'view', component: MailBodyComponent},
    {path: '**', component: MailBodyComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        MailBodyComponent,
        SafeHtmlPipe
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routes, {})
    ],
    providers: [
        {
            provide: 'APP_VERSION',
            useValue: environment.version
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
