import { GroupsHeeaderComponent } from './groups-header/groups-header.component';
import { GroupComponent } from './group/group.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BusyModule } from './../../shared/busy/busy.module';
import { EmptyMessageModule } from './../../shared/empty-message/empty-message.module';
import { GroupListComponent } from './group-list/group-list.component';
import { ManageGroupComponent } from './manage-group/manage-group.component';
import { GroupModalsService } from './group-modals.service';


@NgModule({
  imports: [
    CommonModule,
    BusyModule,
    EmptyMessageModule,
    FormsModule
   ],
  declarations: [
    GroupListComponent,
    ManageGroupComponent,
    GroupComponent,
    GroupsHeeaderComponent
  ],
  exports: [
    GroupListComponent
  ],
  entryComponents: [
    ManageGroupComponent
  ],
  providers: [
    GroupModalsService
  ]
})
export class GroupsModule { }
