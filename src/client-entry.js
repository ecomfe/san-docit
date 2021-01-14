import {Component} from 'san';
import index from './index';

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
};

const app = new Index({
    el: document.getElementById('site')
});

if (process.env.NODE_ENV !== 'production') {
    app.attach(document.getElementById('app'));
}
