import Fetch from '../Fetch';
import SelectEx from '../SelectEx';

export default function (props) {
  return (
    <Fetch
      api={'/api/code/shop'}
      dataProps="options"
    >
      <SelectEx keys={{label: 'name', value: 'value'}}  {...props}></SelectEx>
    </Fetch>
  );
}
