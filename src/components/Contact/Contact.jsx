import { FaPhoneAlt } from 'react-icons/fa';
import { IoIosContact } from 'react-icons/io';
import css from './Contact.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';

export default function Contact({ data: { id, name, number } }) {
  const dispatch = useDispatch();
  return (
    <div className={css.contact}>
      <div>
        <div className={css.info}>
          <IoIosContact />
          <p className={css.name}>{name}</p>
        </div>
        <div className={css.info}>
          <FaPhoneAlt />
          <p className={css.number}>{number}</p>
        </div>
      </div>
      <button className={css.submitButton} onClick={() => dispatch(deleteContact(id))}>
        Delete
      </button>
    </div>
  );
}
