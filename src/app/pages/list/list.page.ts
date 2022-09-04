import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  text: string;
  key: string;

  list: {
    [key: string]: string;
  };

  constructor(private s: StoreService) {}

  async ngOnInit() {
    this.list = (await this.s.get('keys')) as any;
  }

  see(key: string) {
    this.key = key;
    this.text = this.list[key];
  }

  async add() {
    if (this.text.length <= 100 || !this.text.startsWith('---')) return;
    this.list = {
      ...this.list,
      [this.key]: this.text.trim(),
    };
    this.s.set('keys', this.list);
  }

  async remove(key) {
    delete this.list[key];
    this.s.set('keys', this.list);
  }
}
