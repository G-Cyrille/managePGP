import { Component, OnInit } from '@angular/core';
import { createMessage, encrypt, readKey } from 'openpgp';

@Component({
  selector: 'app-encrypt',
  templateUrl: './encrypt.page.html',
  styleUrls: ['./encrypt.page.scss'],
})
export class EncryptPage implements OnInit {
  text: string;
  armoredKey: string;
  encrypted: string;

  constructor() {}

  ngOnInit() {}

  async encrypt() {
    const publicKey = await readKey({
      armoredKey: this.armoredKey,
    });
    this.encrypted = await encrypt({
      message: await createMessage({ text: this.text }), // input as Message object
      encryptionKeys: publicKey,
    });
  }
}
