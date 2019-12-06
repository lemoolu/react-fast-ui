import Fetch from '../Fetch';
import SelectEx from '../SelectEx';

export default function (props) {
  return (
    <Fetch
      api={'/api/video/category'}
      dataProps="options"
      // onResponse={res => res.filter(x => x.parent_id !== 0)}
    >
      <SelectEx keys={{ label: 'name', value: 'id' }} {...props}></SelectEx>
    </Fetch>
  );
}
