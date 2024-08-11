import MainLayout from '@components/screens/MainLayout';
import { PageInfo, CharacterInfo } from '@models/rick-and-morty-api.interface';
import { cardsApi } from '@store/api/cardsApi';
import { wrapper } from '@store/store';
import { GetServerSideProps } from 'next';

type HomePageProps = {
  pageInfo: PageInfo;
  charactersData: CharacterInfo[];
};

const Home = ({ pageInfo, charactersData }: HomePageProps) => {
  return <MainLayout charactersData={charactersData} pageInfo={pageInfo} />;
};

export default Home;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { name = '', page = 1 } = context.query;

  if (context.query.name !== name || context.query.page !== page) {
    return {
      redirect: {
        destination: `/?name=${name}&page=${page}`,
        permanent: false,
      },
    };
  }

  const result = await store.dispatch(cardsApi.endpoints.getCards.initiate({ name: String(name), page: Number(page) }));

  await Promise.all(store.dispatch(cardsApi.util.getRunningQueriesThunk()));

  if (result.error) {
    return { notFound: true };
  }

  return {
    props: {
      pageInfo: result.data?.info,
      charactersData: result.data?.results,
      fallback: true,
    },
  };
});
