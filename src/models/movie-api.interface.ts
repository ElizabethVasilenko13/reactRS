export interface MovieApiResp {
  id: string;
  primaryImage: null | PrimaryImage;
  titleType: TitleType;
  titleText: TitleText;
  originalTitleText: OriginalTitleText;
  releaseYear: ReleaseYear;
  releaseDate: ReleaseDate;
}

export interface ApiError {
  message: string;
}

interface PrimaryImage {
  id: string;
  width: number;
  height: number;
  url: string;
  caption: {
    plainText: string;
  };
}

interface TitleType {
  text: string;
  id: string;
  isSeries: boolean;
  isEpisode: boolean;
}

interface TitleText {
  text: string;
}

interface OriginalTitleText extends TitleText {}

interface ReleaseYear {
  year: number;
  endYear: null;
}

interface ReleaseDate {
  day: number;
  month: number;
  year: number;
}
