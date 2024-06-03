import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, selectNameFilter } from '../../redux/filtersSlice';

const SearchBox = () => {
  const dispatch = useDispatch();
  const selectName = useSelector(selectNameFilter);
  return (
    <div>
      <p>Find contacts by name</p>
      <input
        type="text"
        value={selectName}
        onChange={e => dispatch(changeFilter(e.target.value))}
      />
    </div>
  );
};

export default SearchBox;
