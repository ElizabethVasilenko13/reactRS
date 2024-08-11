import { notFound } from 'next/navigation';
import MainLayout from '@components/screens/MainLayout';

const RICK_AND_MORTY_API_URL = 'https://rickandmortyapi.com/api';

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

const Page = async ({ searchParams }: { searchParams: { name?: string; page?: string; id?: string } }) => {
  const name = searchParams.name || '';
  const page = parseInt(searchParams.page || '1', 10);

  try {
    const { info: pageInfo, results: charactersData } = await fetchData(name, page);

    return <MainLayout charactersData={charactersData} pageInfo={pageInfo} />;
  } catch (error) {
    return notFound();
  }
};

export default Page;
