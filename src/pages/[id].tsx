import DetailItemPage from '@components/screens/Detail/DetailItem';
import MainLayout from '@components/screens/MainLayout';
import { CharacterInfo, PageInfo } from '@models/rick-and-morty-api.interface';
import { cardsApi } from '@store/api/cardsApi';
import { wrapper } from '@store/store';
import { GetServerSideProps } from 'next';

type DetailPageProps = {
  pageInfo: PageInfo;
  charactersData: CharacterInfo[];
  characterData: CharacterInfo;
};

const Detail = ({ pageInfo, charactersData, characterData }: DetailPageProps) => {
  return (
    <MainLayout charactersData={charactersData} pageInfo={pageInfo}>
      <DetailItemPage characterData={characterData} />
    </MainLayout>
  );
};

export default Detail;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { name = '', page = 1, id } = context.query;

  if (context.query.name !== name || context.query.page !== page) {
    return {
      redirect: {
        destination: `${id}/?name=${name}&page=${page}`,
        permanent: false,
      },
    };
  }

  const allCharactersPromise = store.dispatch(
    cardsApi.endpoints.getCards.initiate({ name: String(name), page: Number(page) })
  );
  const oneCharacterPromise = store.dispatch(cardsApi.endpoints.getCard.initiate(String(id)));

  const [allCharactersResult, oneCharacterResult] = await Promise.all([
    allCharactersPromise,
    oneCharacterPromise,
    store.dispatch(cardsApi.util.getRunningQueriesThunk()),
  ]);

  if (allCharactersResult.error || oneCharacterResult.error) {
    return { notFound: true };
  }

  return {
    props: {
      pageInfo: allCharactersResult.data?.info,
      charactersData: allCharactersResult.data?.results,
      characterData: oneCharacterResult.data,
    },
  };
});
