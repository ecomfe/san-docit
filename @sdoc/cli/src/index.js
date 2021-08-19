import {Component, DataTypes} from 'san';
import layout from 'VAR_LAYOUT_IMPORT/layout.san';
import './common/hub';
import './common/register-components';

VAR_THEMES_IMPORT;

export default class Index extends Component {
    static components = {
        layout
    };
    static dataTypes = {
        docit: DataTypes.object
    };
    static template = '<layout docit="{{docit}}"></layout>';
};
