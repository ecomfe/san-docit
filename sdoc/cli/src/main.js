import {SanComponent} from 'san-component';
import index from './index';
import router from './router';

class App extends SanComponent {
    static components = {
        index
    };
    static template = '<index docit="{{docit}}"><index>';
    static computed = {
        docit() {
            // webpack.DefinePlugin SAN_DOCIT
            return VAR_SAN_DOCIT;
        }
    };
    attached() {
        router.start();
    }
}

const app = new App();

app.attach(document.getElementById('app'));
