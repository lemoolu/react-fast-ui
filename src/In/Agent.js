import Fetch from '../Fetch';
import SelectEx from '../SelectEx';

export default function (props) {
  return (
    <Fetch
      api={'/api/code/agent'}
      dataProps="options"
      defaultParams={{
        level: props.level,
        parent_id: props.parentId,
      }}
    >
      <SelectEx keys={{label: 'name', value: 'value'}}  {...props}></SelectEx>
    </Fetch>
  );
}
