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

    @computed public get sourceLeft(): string {
        return `${URL_PREFIX}/${this.versionLeft}/${this.filenameLeft}/${this.typeLeft}.h`;
    }

    @computed public get sourceRight(): string {
        return `${URL_PREFIX}/${this.versionRight}/${this.filenameRight}/${this.typeRight}.h`;
    }

    @computed public get url(): string {
        return `https://ntdiff-mergely.github.io/?_&lhs=${this.sourceLeft}&rhs=${this.sourceRight}`;
    }
}

export { AppModel };

