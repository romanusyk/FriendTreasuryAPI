import { InviteService } from './../shared/services/invite.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../shared/services/auth.service';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IAppConfig } from '../config/iapp.config';
import { ConfigManager } from '../config/app.config';
import { BusyComponent } from '../shared/components/busy/busy.component';

@Component({
    templateUrl: 'invite.component.html',
    styleUrls: ['invite.component.scss']
})
export class InviteComponent implements OnInit, OnDestroy {
    public subscription: Subscription;
    private config: IAppConfig;
    @ViewChild(BusyComponent) loading: BusyComponent;
    constructor(private inviteService: InviteService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastsManager) {
        this.config = ConfigManager.config;
    }
    ngOnDestroy(): void {
        if (!!this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    ngOnInit(): void {
        const name = this.route.snapshot.params['name'];
        this.loading.show();
        if (this.authService.isAuthorized()) {
            this.subscription = this.inviteService.joinGroup(name).subscribe(
                (data) => {
                    this.toastr.success('Joined');
                    this.loading.hide();
                    this.router.navigateByUrl(this.config.endpoint.main);
                },
                (err) => {
                    console.log(err);
                    this.toastr.error('Error while joining to group');
                    this.loading.hide();
                    this.router.navigateByUrl(this.config.endpoint.main);
                }
            );
        } else {
            this.inviteService.save(name);
            this.toastr.info('Please login to join to group');
            this.router.navigateByUrl(this.config.endpoint.login);
        }
    }
}
