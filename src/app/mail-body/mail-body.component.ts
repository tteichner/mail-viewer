import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {firstValueFrom, takeWhile} from 'rxjs';
import PostalMime, {Attachment, Email, RawEmail} from 'postal-mime';

export interface MailBodyServerConfig {
    api: string;
}

@Component({
    selector: 'app-mail-body',
    templateUrl: './mail-body.component.html',
    styleUrls: ['./mail-body.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class MailBodyComponent implements OnInit, OnDestroy {
    parsed: Email | null = null;

    private config: MailBodyServerConfig = {
        api: ''
    };
    private mailId: string | null = null;
    private alive: boolean = false;

    constructor(private http: HttpClient,
                private route: ActivatedRoute,
                private cdr: ChangeDetectorRef) {
    }

    ngOnDestroy(): void {
        this.alive = false;
    }

    async ngOnInit(): Promise<void> {
        this.alive = true;
        this.route.queryParams.pipe(takeWhile(() => this.alive)).subscribe(params => {
            this.mailId = params.mailId;
        });

        this.config = await firstValueFrom(this.http.get<MailBodyServerConfig>(`assets/config.json`));

        let url = `${this.config.api}/${this.mailId}`;
        if (this.config.api.match(/{mailId}/) && this.mailId) {
            url = this.config.api.replace(/{mailId}/, this.mailId);
        }

        const parser = new PostalMime();
        const email = await firstValueFrom(this.http
            .get<Blob>(url, {
                observe: 'response',
                responseType: 'blob' as 'json'
            }));

        this.parsed = await parser.parse(email.body as RawEmail);
        this.cdr.detectChanges();
    }

    download(file: Attachment, evt?: KeyboardEvent): void {
        if (evt && evt.key !== 'Enter' || !file.filename) {
            return;
        }

        const downloadLink = document.createElement('a');
        downloadLink.download = file.filename;
        const blob = new Blob([file.content as string]);
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.style.display = 'none';
        downloadLink.onclick = (event: MouseEvent) => {
            document.body.removeChild(event.target as Node);
        };
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
}
