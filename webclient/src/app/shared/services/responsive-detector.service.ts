import { Injectable } from '@angular/core';

@Injectable()
export class ResponsiveDetectorService {
    private portraitOrientation = 'portrait';
    private landscapeOrientation = 'landscape';

    public isPhonePortraitMode(): boolean {
        return window.screen.width <= 414;
    }

    public isPhoneLandscapeMode(): boolean {
        return window.screen.width <= 736;
    }

    public isLandscapeMode(): boolean {
        return this.getOrientationType().includes(this.landscapeOrientation);
    }

    public isPortraiteMode(): boolean {
        return this.getOrientationType().includes(this.portraitOrientation);
    }

    private getOrientationType(): string {
        return (<any>window.screen).orientation.type;
    }
}
