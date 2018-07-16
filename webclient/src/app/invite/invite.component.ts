import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BusyComponent } from '../shared/busy/busy.component';
import { InviteService } from '../core/invite/invite.service';
import { TokenService } from '../core/auth/token.service';
import { AppConfig } from '@app/config/app.config';

@Component({
    templateUrl: 'invite.component.html'
})
export class InviteComponent implements OnInit, OnDestroy {
    public subscription: Subscription;
    @ViewChild(BusyComponent) loading: BusyComponent;
    constructor(private inviteService: InviteService,
        private tokenService: TokenService,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService) {
    }
    ngOnDestroy(): void {
        if (!!this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    ngOnInit(): void {
        const name = this.route.snapshot.params['name'];
        this.loading.show();
        if (this.tokenService.isAuthorized()) {
            this.subscription = this.inviteService.joinGroup(name).subscribe(
                (data) => {
                    this.toastr.success('Joined');
                    this.loading.hide();
                    this.router.navigateByUrl(AppConfig.routes.main);
                },
                (err) => {
                    console.log(err);
                    this.toastr.error('Error while joining to group');
                    this.loading.hide();
                    this.router.navigateByUrl(AppConfig.routes.main);
                }
            );
        } else {
            this.inviteService.save(name);
            this.toastr.info('Please login to join to group');
            this.router.navigateByUrl(AppConfig.routes.login);
        }
    }
}
