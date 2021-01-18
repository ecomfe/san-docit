import {Component, DataTypes} from 'san';
import layout from './views/layout.san';
import './styles/index.less';
import './common/hub';
import './common/register-components';

export default class Index extends Component {
    static components = {
        layout
    };
    static dataTypes = {
        docit: DataTypes.object
    };
    static template = '<layout docit="{{docit}}"><layout>';
};
