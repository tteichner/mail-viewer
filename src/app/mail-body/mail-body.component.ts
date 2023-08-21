import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {firstValueFrom} from "rxjs";

export interface Attachment {
    content: ArrayBuffer;
    contentId: string;
    disposition: string;
    filename: string;
    mimeType: string;
    related: boolean;
}

export interface Receiver {
    address: string;
    name: string;
}

export interface Mail {
    attachments: Attachment[];
    html: string;
    text: string;
    cc?: Receiver[];
    date: string;
    from: Receiver;
    messageId?: string;
    returnPath?: string;
    subject: string;
    to: Receiver[];
}

export interface MailBodyServerConfig {
    api: string;
}

@Component({
    selector: 'app-mail-body',
    templateUrl: './mail-body.component.html',
    styleUrls: ['./mail-body.component.css']
})
export class MailBodyComponent implements OnInit {
    parsed: Mail;

    private config: MailBodyServerConfig = {
        api: ''
    };
    private mailId: string;

    constructor(private http: HttpClient, private route: ActivatedRoute) {
    }

    async ngOnInit(): Promise<void> {
        this.route.queryParams.subscribe(params => {
            this.mailId = params.mailId;
        });

        this.config = await firstValueFrom(this.http.get<MailBodyServerConfig>(`assets/config.json`));

        let url = `${this.config.api}/${this.mailId}`;
        if (this.config.api.match(/{mailId}/)) {
            url = this.config.api.replace(/{mailId}/, this.mailId);
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const parser = new postalMime.default();
        const email = await firstValueFrom(this.http
            .get<Blob>(url, {
                observe: 'response',
                responseType: 'blob' as 'json'
            }));

        this.parsed = await parser.parse(email.body);
    }

    download(file: Attachment, evt?: KeyboardEvent): void {
        if (evt && evt.key !== 'Enter') {
            return;
        }

        const downloadLink = document.createElement('a');
        downloadLink.download = file.filename;
        const blob = new Blob([file.content]);
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.style.display = 'none';
        downloadLink.onclick = (event: MouseEvent) => {
            document.body.removeChild(event.target as Node);
        };
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
}
