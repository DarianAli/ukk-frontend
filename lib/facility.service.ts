import { get, post, put, drop } from "@/lib/api-bridge";
import { BASE_API_URL } from "@/global";

export interface Facility {
  id: string;
  name: string;
}

export const fetchFacilities = async (token: string) => {
  const { data } = await get(`${BASE_API_URL}/facility`, token);
  return data?.data ?? [];
};

export const createFacility = async (name: string, token: string) => {
  return post(`${BASE_API_URL}/facility`, { name }, token);
};

export const updateFacility = async (
  id: string,
  name: string,
  token: string
) => {
  return put(`${BASE_API_URL}/facility/${id}`, { name }, token);
};

export const deleteFacility = async (id: string, token: string) => {
  return drop(`${BASE_API_URL}/facility/${id}`, token);
};
