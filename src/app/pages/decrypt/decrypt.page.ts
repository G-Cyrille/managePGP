import { Component, OnInit } from '@angular/core';
import {
  decrypt,
  decryptKey,
  readKey,
  readMessage,
  readPrivateKey,
} from 'openpgp';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-decrypt',
  templateUrl: './decrypt.page.html',
  styleUrls: ['./decrypt.page.scss'],
})
export class DecryptPage implements OnInit {
  privateKey: string;
  publicKey: string;
  passphrase: string;

  save: boolean;

  message: string;
  result: any;

  constructor(private s: StoreService) {}

  async ngOnInit() {
    //this.privateKey = ((await this.s.get('dc-privateKey')) as string) || '';
    this.publicKey = ((await this.s.get('dc-publicKey')) as string) || '';
    this.passphrase = ((await this.s.get('dc-passphrase')) as string) || '';
    this.save = (await this.s.get('dc-save')) as boolean;
  }

  async decrypt() {
    if (this.save) {
      //await this.s.set('dc-privateKey', this.privateKey);
      await this.s.set('dc-publicKey', this.publicKey);
      await this.s.set('dc-passphrase', this.passphrase);
    }
    await this.s.set('dc-save', this.save);

    const privateKey = await readPrivateKey({ armoredKey: this.privateKey });
    const decryptionKeys = await decryptKey({
      privateKey,
      passphrase: this.passphrase,
    });

    const verificationKeys = await readKey({ armoredKey: this.publicKey });

    const message = await readMessage({
      armoredMessage: this.message, // parse armored message
    });

    this.result = await decrypt({
      message,
      verificationKeys,
      decryptionKeys,
    });
  }
}
