import { InviteService } from './../shared/services/invite.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../shared/services/auth.service';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    templateUrl: 'invite.component.html',
    styleUrls: ['invite.component.scss']
})
export class InviteComponent implements OnInit, OnDestroy {
    public subscription: Subscription;
    constructor(private inviteService: InviteService,
                private authService: AuthService,
                private router: Router,
                private route: ActivatedRoute,
                private toastr: ToastsManager) {
    }
    ngOnDestroy(): void {
        if (!!this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    ngOnInit(): void {
        const name = this.route.snapshot.params['name'];
        if (this.authService.isAuthorized()) {
            this.subscription = this.inviteService.joinGroup(name).subscribe(
                (data) => {
                    this.toastr.success('Joined');
                    this.router.navigateByUrl('/index');
                },
                (err) => {
                    console.log(err);
                    this.toastr.error('Error while joining to group');
                    this.router.navigateByUrl('/index');
                }
            );
        } else {
            this.inviteService.save(name);
            this.toastr.info('Please login to join to group');
            this.router.navigateByUrl('/login');
        }
    }
}
