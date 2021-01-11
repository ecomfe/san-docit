import {Component, DataTypes} from 'san';
import layout from './views/layout.san';
import './styles/index.less';
import './common/hub';
import './common/registerComponents';

export default class Index extends Component {
    static components = {
        layout
    };
    static dataTypes = {
        docit: DataTypes.object
    };
    static template = '<layout docit="{{docit}}"><layout>';
    static computed = {
        docit() {
            return this.data.get('docit');
        }
    };
};