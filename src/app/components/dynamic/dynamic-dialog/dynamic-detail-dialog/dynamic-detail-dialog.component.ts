import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {IDynamicDialog, IDynamicDialogField} from '../dynamic-dialog.model';
import {Subscription} from 'rxjs/Subscription';
import {Broadcaster} from '../../../../broadcast/broadcaster';

@Component({
  selector: 'cn-dynamic-detail-dialog',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dynamic-detail-dialog.component.html',
  styleUrls: ['./dynamic-detail-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CnDynamicDetailDialogComponent implements OnInit, OnDestroy {
  @Input() dialogConfigField;
  @Input() GUID;
  selectedIds: Map<string, string>;
  _subscribe: Subscription;

  constructor(private _broadcast: Broadcaster) {
  }

  ngOnInit() {
    this.registerBroadcast();
  }

  registerBroadcast() {
    this._subscribe = this._broadcast.on<any>('detail_' + this.GUID).subscribe(data => {
      this.selectedIds = new Map<string, string>();
      this.selectedIds.set('detailId', data.detailId);
      if (this.dialogConfigField
        && Array.isArray(this.dialogConfigField)
        && this.dialogConfigField.length > 0) {
        const newConfig = Object.assign([], this.dialogConfigField);
        newConfig.forEach((configs) => {
          configs.forEach((config) => {
            config.viewCfg.P_GUID = this.GUID;
            config.viewCfg.selectedIds = new Map<string, string>();
            config.viewCfg.selectedIds.set('detailId', data.detailId);
          });
        });
        this.dialogConfigField = newConfig;
      }
    });
  }

  ngOnDestroy(): void {
    if (this._subscribe) {
      this._subscribe.unsubscribe();
    }
  }
}
