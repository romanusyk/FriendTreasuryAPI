import { GroupListComponent } from './components/group-list/group-list.component';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { IndexComponent } from './components/index/index.component';

@NgModule({
    imports: [

    ],
    declarations: [
        IndexComponent,
        GroupListComponent
    ],
    exports: [
        IndexComponent,
        GroupListComponent
    ]
})
export class IndexModule {

}
