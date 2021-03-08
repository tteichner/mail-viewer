import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-mail-body',
  templateUrl: './mail-body.component.html',
  styleUrls: ['./mail-body.component.css']
})
export class MailBodyComponent implements OnInit {
  text = '';

  private config: any = {
    api: 'https://admin.teichner.biz/plugin/crm/download'
  };
  private mailId: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
    await this.route.queryParams.subscribe(params => {
      this.mailId = params.mailId;
    });

    const parser = new postalMime.default();
    const email = await this.http
      .get<Blob>(`${this.config.api}/${this.mailId}`, {
        observe: 'response',
        responseType: 'blob' as 'json'
      }).toPromise();

    const parsed = await parser.parse(email.body);
    console.log(parsed);
    this.text = parsed.text;
  }
}
