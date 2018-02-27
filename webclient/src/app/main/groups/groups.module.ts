import { MdlDialogModule, MdlButtonModule } from '@angular-mdl/core';
import { BusyModule } from './../../shared/busy/busy.module';
import { CommonModule } from '@angular/common';
import { ManageGroupComponent } from './../manage-group/manage-group.component';
import { NgModule } from '@angular/core';
import { GroupListComponent } from './group-list/group-list.component';
import { FtTextFieldModule } from '../../shared/override-mdl/text-field/text-field.module';


@NgModule({
  imports: [
    CommonModule,
    BusyModule,
    MdlDialogModule.forRoot(),
    MdlButtonModule.forRoot(),
    FtTextFieldModule
   ],
  declarations: [
    GroupListComponent,
    ManageGroupComponent
  ],
  entryComponents: [
    ManageGroupComponent
  ],
  providers: [

  ]
})
export class GroupsModule { }
