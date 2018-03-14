import { MdlButtonModule, MdlDialogModule } from '@angular-mdl/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';

import { FtTextFieldModule } from '../../shared/override-mdl/text-field/text-field.module';
import { BusyModule } from './../../shared/busy/busy.module';
import { EmptyMessageModule } from './../../shared/empty-message/empty-message.module';
import { GroupListComponent } from './group-list/group-list.component';
import { ManageGroupComponent } from './manage-group/manage-group.component';
import { GroupModalsService } from './group-modals.service';


@NgModule({
  imports: [
    CommonModule,
    BusyModule,
    MdlDialogModule.forRoot(),
    MdlButtonModule.forRoot(),
    FtTextFieldModule,
    AvatarModule,
    EmptyMessageModule,
    FormsModule
   ],
  declarations: [
    GroupListComponent,
    ManageGroupComponent
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
