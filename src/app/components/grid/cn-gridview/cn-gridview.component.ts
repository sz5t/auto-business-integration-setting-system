import {AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs/Subject';
import {ClientStorageService} from '../../../services/client-storage.service';
import {OnlineUser} from '../../../login/cn-login/online-user.model';

@Component({
  selector: 'cn-gridview',
  templateUrl: './cn-gridview.component.html',
  styleUrls: ['./cn-gridview.component.css']
})
export class CnGridViewComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  @Input() dtOptions: DataTables.Settings;
  gridConfig;
  dtTrigger: Subject<object> = new Subject();

  constructor() {

  }

  ngOnChanges() {
    if (this.dtOptions.columns && this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtElement.dtOptions = this.dtOptions;
        this.dtElement.dtTrigger.next();
        dtInstance.draw();
      });
    }
  }

  ngOnInit(){
    this.init();
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  checkAll() {
    $('#checkall').click(function () {
      let check = $(this).prop('checked');
      $('input[name=\'checkchild\']').prop('checked', check);
    });
  }

  init() {
    this.gridConfig = this.dtOptions;
  }

  reload(newURL?: string): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      if (newURL) {
        dtInstance.ajax.url(newURL).load();
      }
      else {
        dtInstance.ajax.reload();
      }
    });
  }

  reloadWithNewConfig(config){
    this.gridConfig = config;
    if (this.dtOptions.columns && this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtElement.dtOptions = config;
        //dtInstance.ajax.url(config.ajax.url).load();
        //this.dtTrigger.next();
        this.dtElement.dtTrigger.next();

        dtInstance.draw();
      });
    }
  }
}
