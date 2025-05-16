import axios from 'axios';

const KEY_API = '40252530-8571e952a05bfbe082a85c49d';
const BASE_URL = 'https://pixabay.com/api/';

export interface PixabayImage {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
  likes: number;
  views: number;
  comments: number;
  downloads: number;
  user: string;
  userImageURL: string;
}

interface PixabayResponse {
  total: number;
  totalHits: number;
  hits: PixabayImage[];
}

export async function getImages(
  searchName: string,
  page: number
): Promise<PixabayResponse> {
  const params = new URLSearchParams({
    key: KEY_API,
    q: searchName,
    page: `${page}`,
    per_page: `${12}`,
  });
  const { data } = await axios.get<PixabayResponse>(`${BASE_URL}?${params}`);
  return data;
}
