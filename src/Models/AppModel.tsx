import * as _ from 'lodash';
import { observable, computed } from 'mobx';

const VERSION_LEFT_DEFAULT      = 'Win7/x64/System32';
const FILENAME_LEFT_DEFAULT     = 'ntoskrnl.exe';
const TYPE_LEFT_DEFAULT         = 'Standalone/_KPCR';

const VERSION_RIGHT_DEFAULT     = 'Win10_1803_RS4/x64/System32';
const FILENAME_RIGHT_DEFAULT    = 'ntoskrnl.exe';
const TYPE_RIGHT_DEFAULT        = 'Standalone/_KPCR';

const URL_PREFIX = `https://raw.githubusercontent.com/ntdiff/headers/master`;

class AppModel {
    @observable public versionLeft: string = VERSION_LEFT_DEFAULT;
    @observable public filenameLeft: string = FILENAME_LEFT_DEFAULT;
    @observable public typeLeft: string = TYPE_LEFT_DEFAULT;
    
    @observable public versionRight: string = VERSION_RIGHT_DEFAULT;
    @observable public filenameRight: string = FILENAME_RIGHT_DEFAULT;
    @observable public typeRight: string = TYPE_RIGHT_DEFAULT;

    @computed public get sourceLeftPath(): string {
        return `/${this.versionLeft}/${this.filenameLeft}/${this.typeLeft}.h`;
    }

    @computed public get sourceRightPath(): string {
        return `/${this.versionRight}/${this.filenameRight}/${this.typeRight}.h`;
    }

    @computed public get sourceLeftUrl(): string {
        return `${URL_PREFIX}${this.sourceLeftPath}`;
    }

    @computed public get sourceRightUrl(): string {
        return `${URL_PREFIX}${this.sourceRightPath}`;
    }

    public serialize() {
        return {
            versionLeft: this.versionLeft,
            filenameLeft: this.filenameLeft,
            typeLeft: this.typeLeft,

            versionRight: this.versionRight,
            filenameRight: this.filenameRight,
            typeRight: this.typeRight
        };
    }

    public deserialize(object: any) {
        this.versionLeft = object.versionLeft;
        this.filenameLeft = object.filenameLeft;
        this.typeLeft = object.typeLeft;

        this.versionRight = object.versionRight;
        this.filenameRight = object.filenameRight;
        this.typeRight = object.typeRight;
    }
}

export { AppModel };

