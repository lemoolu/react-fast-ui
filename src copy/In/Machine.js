import Fetch from '../Fetch';
import SelectEx from '../SelectEx';

export default function (props) {
  return (
    <Fetch
      api={'/api/code/machine'}
      dataProps="options"
      defaultParams={{
        parent_id: props.parentId,
      }}
    >
      <SelectEx keys={{label: 'name', value: 'value'}}  {...props}></SelectEx>
    </Fetch>
  );
}
