import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
import { selectFilteredContacts } from '../../redux/contactsSlice';

export default function ContactList() {
  const selectContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.list}>
      {selectContacts.map(item => (
        <li key={item.id}>
          <Contact data={item} />
        </li>
      ))}
    </ul>
  );
}
