import ContactForm from '../../components/ContactForm/ContactForm';
import SearchBox from '../../components/SearchBox/SearchBox';
import ContactList from '../../components/ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectLoading } from '../../redux/contacts/selector';
import { fetchContacts } from '../../redux/contacts/operations';
import { useEffect } from 'react';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import toast from 'react-hot-toast';
import PageTitle from '../../components/PageTitle/PageTitle';

export default function ContactsPage() {
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (!isLoggedIn) toast.error('Please Log In');

  return (
    <div>
      <PageTitle>Phonebook</PageTitle>
      {isLoggedIn ? (
        <div>
          <ContactForm></ContactForm>
          <SearchBox></SearchBox>
          {isLoading && <div>Loading...</div>}
          {isError && <div> {isError}</div>}
          <ContactList></ContactList>
        </div>
      ) : (
        <div> </div>
      )}
    </div>
  );
}
