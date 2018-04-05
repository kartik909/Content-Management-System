import { PageService } from './../.././services/page.service';
import { Component, OnInit } from '@angular/core';
import {RouterModule, Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  pages: any;
  user: string;
  constructor(public pageService: PageService) { }

  get userLoggedIn() {
    if (localStorage.getItem('user')) {
      this.user = localStorage.getItem('user').replace(/\"/g, '');
      return true;
    }
    return false;
  }
  ngOnInit() {
    this.pageService.getPages().subscribe(pages => {
      this.pageService.pagesBS.next(pages);
      this.pages = this.pageService.pagesBS;
    });
  }

}
