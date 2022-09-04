import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  initialized = false;

  constructor(private storage: Storage) {}

  async init() {
    try {
      await this.storage.create();
    } catch (e) {
      console.error(`ERREUR LORS DE L'INITIALISATION DU STORAGE : `, e);
    }
  }

  async get(key: string): Promise<unknown> {
    const v = this._get(key);
    // console.log(key, '->', await v);
    return v;
  }

  async set(key: string, value: any) {
    return this._set(key, value);
  }

  private async _get(key: string): Promise<unknown> {
    if (!this.initialized) {
      await this.init();
    }
    return await this.storage.get(key);
  }

  private async _set(key: string, value: any) {
    if (!this.initialized) {
      await this.init();
    }
    return this.storage.set(key, value);
  }
}
