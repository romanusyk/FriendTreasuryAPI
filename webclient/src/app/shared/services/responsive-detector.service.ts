import { Injectable } from '@angular/core';

@Injectable()
export class ResponsiveDetectorService {
    private portraitOrientation = 'portrait';
    private landscapeOrientation = 'landscape';

    isPhonePortraitMode(): boolean {
        return window.screen.width <= 414 && this.isPortraiteMode();
    }

    isPhoneLandscapeMode(): boolean {
        return window.screen.width <= 736 && this.isLandscapeMode();
    }

    isLandscapeMode(): boolean {
        return this.getOrientationType().includes(this.landscapeOrientation);
    }

    isPortraiteMode(): boolean {
        return this.getOrientationType().includes(this.portraitOrientation);
    }

    private getOrientationType(): string {
        return (<any>window.screen).orientation.type;
    }
}
