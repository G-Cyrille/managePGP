import { Component, OnInit } from '@angular/core';
import { generateKey } from 'openpgp';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.page.html',
  styleUrls: ['./generate.page.scss'],
})
export class GeneratePage implements OnInit {
  userId: {
    name: string;
    email: string;
  } = {
    name: '',
    email: '',
  };
  passphrase: string;

  result: any;

  constructor() {}

  ngOnInit() {}

  async generate() {
    this.result = await generateKey({
      userIDs: [this.userId], // you can pass multiple user IDs
      passphrase: this.passphrase,
      format: 'armored', // output key format, defaults to 'armored' (other options: 'binary' or 'object')
    });

    this.result = {
      ...this.userId,
      passphrase: this.passphrase,
      ...this.result,
    };
  }
}
