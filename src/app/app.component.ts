import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Encrypt', url: '/encrypt', icon: 'mail' },
    { title: 'List', url: '/list', icon: 'list' },
    { title: 'Generate', url: '/generate', icon: 'person-add' },
    { title: 'Decrypt', url: '/decrypt', icon: 'telescope' },
    //{ title: 'Verify', url: '/verify', icon: 'shield-checkmark' },
  ];
  constructor() {}
}
