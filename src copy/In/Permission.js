import Fetch from '../Fetch';
import SelectEx from '../SelectEx';

export default function (props) {
  return (
    <Fetch
      api={'/api/admin/permission'}
      dataProps="options"
    >
      <SelectEx keys={{label: 'name', value: 'id'}} mode="multiple" {...props}></SelectEx>
    </Fetch>
  );
}
