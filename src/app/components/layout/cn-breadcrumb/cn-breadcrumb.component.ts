import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Breadcrumb, BreadcrumbResolver} from '../../../framework/resolver/breadcrumb.resovler';
import {ClientStorageService} from '../../../services/client-storage.service';

@Component({
  selector: 'cn-breadcrumb',
  templateUrl: './cn-breadcrumb.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./cn-breadcrumb.component.css']
})
export class CnBreadcrumbComponent implements OnInit {
  title: string;
  desc: string;
  breadcrumbs: any[];
  breadcrumbData: Map<string, Breadcrumb>;

  constructor(private route: ActivatedRoute, private clientStorage: ClientStorageService) {
    /*this.breadcrumbData =
     new BreadcrumbResolver(this.configService.getProjectConfig()).config;*/
    if (this.clientStorage.getSessionStorage('appModuleConfig')) {
      this.breadcrumbData =
        new BreadcrumbResolver(this.clientStorage.getSessionStorage('appModuleConfig')).config;
    }
  }

  ngOnInit() {
    // get bread info and set page value
    this.route.params.subscribe((params) => {
      if (this.breadcrumbData) {
        const bread = this.breadcrumbData.get(params.id);
        if (bread) {
          this.title = bread.breadcrumb.title;
          this.desc = bread.breadcrumb.desc;
          this.breadcrumbs = bread.breadcrumb.breadcrumbs;
        }
      }
    });
  }

}


