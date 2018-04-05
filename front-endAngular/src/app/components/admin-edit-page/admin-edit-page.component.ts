import { Title } from '@angular/platform-browser';
import { PageService } from './../../services/page.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var CKEDITOR: any;

@Component({
  selector: 'app-admin-edit-page',
  templateUrl: './admin-edit-page.component.html',
  styleUrls: ['./admin-edit-page.component.css']
})
export class AdminEditPageComponent implements OnInit {

  title: string;
  content: string;
  id: string;
  param: any;
  page: any;
  successMsg = false;
  errorMsg = false;
  errorMsg2 = false;
  sidebar = false;

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('user') !== '"admin"') {
      this.router.navigateByUrl('');
  } else {
    CKEDITOR.replace('content');
  }
    this.route.params.subscribe(params => {
      this.param = params['id'];
    this.pageService.getEditPage(this.param).subscribe(page => {
      this.page = page;
      this.title = page.title;
        this.content = page.content;
        this.id = page._id;
        if (page.sidebar === 'yes') {
          this.sidebar = true;
        }
      });
    });
  }

  // Edit Functionality
  // - create edit component
  // - create method in servicee
  // - create get method in node
  // - create Html in edit component
  // - get id from route params
  // - get details of that page from     pages service
  //  -create post method in service
  // -make changes in tittle
  // -add ckeditor
  // -create post req in node
  // -create edit method in component

  editPage({value, valid}) {

    if (valid) {
      value.content = CKEDITOR.instances.content.getData();
      this.pageService.postEditPage(value).subscribe(res => {
        if (res === 'pageExists') {
            this.errorMsg = true;
          setTimeout(function() {
            this.errorMsg = false;
          }.bind(this), 2000);
          } else if (res === 'problem') {
            this.errorMsg2 = true;
            setTimeout(function() {
              this.errorMsg2 = false;
            }.bind(this), 2000);
          } else {
            this.successMsg = true;
            setTimeout(function() {
              this.successMsg = false;
            }.bind(this), 2000);

            this.pageService.getPages().subscribe(pages => {
              this.pageService.pagesBS.next(pages);
            });
          }
});
}
}

}
