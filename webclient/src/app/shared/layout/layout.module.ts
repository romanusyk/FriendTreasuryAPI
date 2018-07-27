import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContentComponent } from './content/content.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SideBarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ContentComponent, SideBarComponent, NavigationComponent],
  exports: [ContentComponent, SideBarComponent, NavigationComponent]
})
export class LayoutModule {}
