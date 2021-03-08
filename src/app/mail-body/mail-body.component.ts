import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

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

@Component({
  selector: 'app-mail-body',
  templateUrl: './mail-body.component.html',
  styleUrls: ['./mail-body.component.css']
})
export class MailBodyComponent implements OnInit {
  parsed: Mail;

  private config: any = {
    api: ''
  };
  private mailId: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
    await this.route.queryParams.subscribe(params => {
      this.mailId = params.mailId;
    });

    this.config = await this.http.get<any>(`assets/config.json`).toPromise();

    const parser = new postalMime.default();
    const email = await this.http
      .get<Blob>(`${this.config.api}/${this.mailId}`, {
        observe: 'response',
        responseType: 'blob' as 'json'
      }).toPromise();

    this.parsed = await parser.parse(email.body);
  }

  download(file: Attachment): void {
    if (window.navigator.msSaveOrOpenBlob) {
      const blob = new Blob([file.content]);
      window.navigator.msSaveOrOpenBlob(blob, file.filename);
    } else {
      const downloadLink = document.createElement('a');
      downloadLink.download = file.filename;
      const blob = new Blob([file.content]);
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.style.display = 'none';
      downloadLink.onclick = (event: any) => {
        document.body.removeChild(event.target);
      };
      document.body.appendChild(downloadLink);
      downloadLink.click();
    }
  }
}
