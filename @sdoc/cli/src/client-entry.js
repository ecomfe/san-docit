import {SanComponent} from 'san-component';
import index from './index';
import router from './router';

export default class App extends SanComponent {
    static components = {
        index
    };
    static template = '<index docit="{{docit}}"></index>';
    static computed = {
        docit() {
            // webpack.DefinePlugin SAN_DOCIT
            return VAR_SAN_DOCIT;
        }
    };
    attached() {
        router.start();
    }
};

// 组件反解：传入el
new App({
    el: document.getElementById('site')
});
