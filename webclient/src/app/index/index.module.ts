import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdlModule } from 'angular2-mdl';
import { GroupListComponent } from './components/group-list/group-list.component';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { IndexComponent } from './components/index/index.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MdlModule,
        SharedModule
    ],
    declarations: [
        GroupListComponent,
        IndexComponent,
    ],
    exports: [
        GroupListComponent,
        IndexComponent,
    ]
})
export class IndexModule {

}
