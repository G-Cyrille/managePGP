import { Component, OnInit } from '@angular/core';
import { readKey, readMessage, verify } from 'openpgp/lightweight';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {
  text: string;
  armoredKey: string;
  result: any;

  constructor(private s: StoreService) {}

  async ngOnInit() {
    this.text = ((await this.s.get('vftext')) as string) || '';
    this.armoredKey = ((await this.s.get('vfarmoredKey')) as string) || '';
  }

  async verify() {
    await this.s.set('vftext', this.text);
    await this.s.set('vfarmoredKey', this.armoredKey);

    // const privateKey = await readPrivateKey({ armoredKey: this.privateKey });
    // const decryptionKeys = await decryptKey({
    //   privateKey,
    //   passphrase: this.passphrase,
    // });

    const verificationKeys = await readKey({ armoredKey: this.armoredKey });

    console.log(this.text);

    const message = await readMessage<string>({
      armoredMessage: this.text, // parse armored message
      config: {},
    });

    this.result = await verify({
      message,
      verificationKeys,
    });

    // const message = await readMessage({ armoredMessage: this.text });

    // const publicKey = await readKey({
    //   armoredKey: this.armoredKey,
    // });
    // const stream = new ReadableStream({
    //   start: (controller) => {
    //     controller.enqueue(this.text);
    //     controller.close();
    //   },
    // });
    // const message = await readCleartextMessage({
    //   cleartextMessage: this.text,
    // });
    /*
    const opt: VerifyOptions & { message: Message<MaybeStream<Data>> } = {
      message,
      verificationKeys: publicKey,
      format: 'binary',
    };

    // const options = {
    //   message: await openpgp.readCleartextMessage({cleartextMessage:this.text}),
    //   publicKeys: (await openpgp.key.readArmored(ctPubKey)).keys
    //  }

    const verificationResult = await verify(opt);
    const { verified, keyID } = verificationResult.signatures[0];
    try {
      // throws on invalid signature

      console.log('Signed by key id ' + keyID.toHex());
      this.resultat = {
        verified: await verified,
        keyID,
      };
    } catch (e) {
      this.resultat = {
        verified: false,
        keyID,
      };
      throw new Error('Signature could not be verified: ' + e.message);
    }
    */
  }
}
