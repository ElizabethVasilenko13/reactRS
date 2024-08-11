import DetailItemPage from '@components/screens/Detail/DetailItem';
import MainLayout from '@components/screens/MainLayout';
import { CharacterInfo } from '@models/rick-and-morty-api.interface';

const RICK_AND_MORTY_API_URL = 'https://rickandmortyapi.com/api';

const fetchCharacter = async (id: string): Promise<CharacterInfo | null> => {
  try {
    const response = await fetch(`${RICK_AND_MORTY_API_URL}/character/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch character');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const fetchData = async (name: string, page: number) => {
  try {
    const response = await fetch(`${RICK_AND_MORTY_API_URL}/character?name=${name}&page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

const Page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { name?: string; page?: string };
}) => {
  const { id } = params; // Path parameter
  const name = searchParams.name ?? '';
  const page = parseInt(searchParams.page ?? '1', 10);

  const characterData = id ? await fetchCharacter(id) : null;
  const { info: pageInfo, results: charactersData } = await fetchData(name, page);

  if (!characterData) {
    return 'Character not found';
  }

  return (
    <MainLayout charactersData={charactersData} pageInfo={pageInfo}>
      <DetailItemPage characterData={characterData} />
    </MainLayout>
  );
};

export default Page;
