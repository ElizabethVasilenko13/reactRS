import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const DetailItemPage: React.FC = () => {
  const navigate = useNavigate();

  // useEffect with empty dependency array to run only on mount and cleanup function to run on unmount
  useEffect(() => {
    return () => {
      console.log('back');
      // Navigate to a different page when the component is unmounted
      navigate('/'); // Replace '/other-page' with your desired path
    };
  }, [navigate]); // Em
  return (
    <div>
      detail
    </div>
    // <div className={styles.loader}>
    //   <div className={styles.loader__filmstrip} />
    //   <p className={styles.loader__text}>loading</p>
    // </div>
  );
};

export default DetailItemPage;
