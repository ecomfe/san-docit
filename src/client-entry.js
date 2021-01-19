import {Component} from 'san';
import index from './index';
import router from './router';

export default class Index extends Component {
    static components = {
        index
    };
    static template = '<index docit="{{docit}}"><index>';
    static computed = {
        docit() {
            return process.env.SAN_DOCIT;
        }
    };
    attached() {
        router.start();
    }
};

// 组件反解：传入el
new Index({
    el: document.getElementById('site')
});
