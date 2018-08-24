import * as _ from 'lodash';
import { observable } from 'mobx';

import Axios from 'axios';

interface IDescriptorItem {
    key: string;
    text: string;
    value: string;
}

interface IDescriptor {
    version: IDescriptorItem[];
    filename: IDescriptorItem[];
    type: IDescriptorItem[];
}

const URL_PREFIX = `https://raw.githubusercontent.com/ntdiff/headers/master`;

class AppStore {
    public constructor() {
        this.descriptor = {
            version: [],
            filename: [],
            type: []
        };

        Axios.get<IDescriptor>(`${URL_PREFIX}/descriptor.json`).then(response => {
            const compare = (lhs, rhs) => {
                return lhs.key > rhs.key ?  1
                     : lhs.key < rhs.key ? -1
                     : 0;
            };

            response.data.filename = response.data.filename.sort(compare);
            response.data.version = response.data.version.sort(compare);
            response.data.type = response.data.type.sort(compare);

            this.descriptor = response.data;
        });
    }

    @observable public descriptor: IDescriptor;
}

const store = new AppStore();
export { store as AppStore };
