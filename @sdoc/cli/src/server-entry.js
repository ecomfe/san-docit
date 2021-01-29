import {Component} from 'san';
import index from './index';
import router from './router';

export default class App extends Component {
    static components = {
        index: index
    };
    static template = '<index docit="{{docit}}"><index>';
    static computed = {
        docit() {
            // `SAN_DOCIT` 通过 san-ssr 注入的变量
            return this.data.get('SAN_DOCIT');
        }
    }
    attached() {
        router.start();
    }
};
