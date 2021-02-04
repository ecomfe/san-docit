
import san from 'san';
import codeboxMd from './codebox.md?exportType=markdown';
import codeboxComponent from './codebox.md?exportType=component';
import codeboxAll from './codebox.md';

export default san.defineComponent({
    template: `<div>
        <h1>Markdown 高级配置</h1>
        <codebox-md/><hr>
        <codebox-component/><hr>
        <codebox-all/>
    </div>`,
    components: {
        'codebox-md': codeboxMd,
        'codebox-component': codeboxComponent,
        'codebox-all': codeboxAll
    }
});
