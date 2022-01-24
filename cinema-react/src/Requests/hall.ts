import { Hall } from '../data/Hall';
const url = `${process.env.REACT_APP_BACKEND}/api/hall`;
export const getHalls = async (): Promise<Hall[]> => {
  try {
    const json: Response = await fetch(url);
    return await json.json();
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getHallById = (id: string): Promise<Hall | null> => {
  return fetch(`${process.env.REACT_APP_BACKEND}/api/hall/id/${id}`).then(
    (response: Response) => response.json()
  );
};

export const getHallByNumber = async (
  number: number
): Promise<Response | null> => {
  try {
    return await fetch(`${url}/number/${number}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const updateHall = async (
  fetchUrl: string,
  fetchMethod: string,
  hall: Hall
): Promise<boolean> => {
  try {
    const res: Response = await fetch(fetchUrl, {
      method: fetchMethod,
      body: JSON.stringify(hall),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.ok;
  } catch (e) {
    console.error(e);
    return false;
  }
};
