import { UserDto } from '@/types/UserDto';
import { parseUserData } from './parsers';
import { encodeQueryData } from './functions';
import PositionDto from '@/types/PositionDto';

export type UserRequestParams = {
  page: number;
  count: number;
};
export type UsersResponce = {
  users: UserDto[];
  pageNum: number;
  totalPages: number;
};

export type RegistrationResponce = {
  success: boolean;
  message: string;
  user_id?: number;
  fails?: {
    [key: string]: string[];
  };
};
export type RegistrationBody = {
  name: string;
  email: string;
  phone: string;
  position_id: string;
  photo: File;
};
export type TokenResponce = {
  success: boolean;
  token: string;
};

export default class API {
  static API_URL: string = process.env.VUE_APP_API_URL;
  static token: string = localStorage.getItem('token') || '';

  static async getUsers(
    id?: number,
    params?: UserRequestParams,
    settings?: RequestInit
  ): Promise<UsersResponce> {
    const response = await this.call<any>(
      '/users' +
        (id ? id : '') +
        (!params ? '' : `?${encodeQueryData(params)}`),
      settings
    );
    const users = response.users.map(parseUserData) || [];
    const { page, total_pages } = response;

    return { users, pageNum: page, totalPages: total_pages };
  }

  static async getPositions(): Promise<PositionDto[]> {
    const response = await this.call<any>('/positions');

    return response.positions || [];
  }

  static async registrate(
    body: RegistrationBody
  ): Promise<RegistrationResponce | null> {
    if (!this.token) {
      await this.setToken();
    }
    const data = new FormData();
    Object.keys(body).forEach((key) => {
      data.append(key, body[key as keyof RegistrationBody]);
    });
    const res = await this.call<RegistrationResponce>('/users', {
      method: 'POST',
      body: data,
      headers: {
        Token: this.token,
      },
    });
    if (!this.token && !res?.success) {
      return {
        success: false,
        message:
          'The token has expired. Please try again and it will be updated',
      } as RegistrationResponce;
    }
    return res;
  }

  static async setToken() {
    const tokenRes = await this.call<TokenResponce>('/token', {
      method: 'get',
    });
    if (!tokenRes?.success) {
      throw new Error('Token responce error');
    }
    this.token = tokenRes.token;
    localStorage.setItem('token', this.token);
  }

  static async call<T>(
    endPoint: string,
    settings?: RequestInit
  ): Promise<T | null> {
    try {
      const response = await fetch(this.API_URL + endPoint, settings);
      if (response.status === 401) {
        this.token = '';
      }
      const data = await response.json();
      if (!(response.ok || data)) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return data;
    } catch (error) {
      console.error(error); // log error to console
      return null;
    }
  }
}
