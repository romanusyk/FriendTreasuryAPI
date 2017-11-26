import { Subscription } from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MdlDialogComponent } from '@angular-mdl/core';
import { Group } from './../../shared/models/group.model';
import { GroupService } from './../../shared/services/group.service';
import { Component, OnInit, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';

@Component({
    selector: 'ft-create-group',
    templateUrl: 'create-group.component.html',
    styleUrls: ['create-group.component.scss']
})
export class CreateGroupComponent implements OnInit, OnDestroy {
    @Output() public complete: EventEmitter<any> = new EventEmitter();
    @ViewChild(MdlDialogComponent) dialog: MdlDialogComponent;
    public model: Group;
    public subscription: Subscription;
    constructor(private groupService: GroupService, private toastr: ToastsManager) {
    }
    ngOnInit(): void {
        this.model = new Group();
    }

    ngOnDestroy(): void {
        if (!!this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onSave() {
        this.subscription = this.groupService.create(this.model).subscribe(
            (data) => {
                this.toastr.success('Success');
                this.complete.emit();
                this.dialog.close();
            },
            (err) => this.toastr.error('Error')
        );
    }

}
