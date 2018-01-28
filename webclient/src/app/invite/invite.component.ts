import { InviteService } from './../shared/services/invite.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IAppConfig } from '../config/iapp.config';
import { ConfigManager } from '../config/app.config';
import { BusyComponent } from '../shared/components/busy/busy.component';
import { AuthDataService } from '../shared/services/auth-data.service';

@Component({
    templateUrl: 'invite.component.html'
})
export class InviteComponent implements OnInit, OnDestroy {
    public subscription: Subscription;
    private config: IAppConfig;
    @ViewChild(BusyComponent) loading: BusyComponent;
    constructor(private inviteService: InviteService,
        private authService: AuthDataService,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService) {
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
                    this.router.navigateByUrl(this.config.routes.main);
                },
                (err) => {
                    console.log(err);
                    this.toastr.error('Error while joining to group');
                    this.loading.hide();
                    this.router.navigateByUrl(this.config.routes.main);
                }
            );
        } else {
            this.inviteService.save(name);
            this.toastr.info('Please login to join to group');
            this.router.navigateByUrl(this.config.routes.login);
        }
    }
}
