import { name } from 'faker';
import axios, { AxiosRequestConfig } from 'axios';
import { EnvironmentConfig } from '../../configs';
import {
  createUserAsync,
  getAccessTokenAsync,
  getAxiosConfig,
} from '../helpers';

const { findName } = name;
const url = `http://localhost:${EnvironmentConfig.serverPort}/customers`;
let accessToken: string;
let axiosConfig: AxiosRequestConfig;
let customerProfile: any;

beforeAll(async () => {
  const { id, email, password } = await createUserAsync();
  accessToken = await getAccessTokenAsync(email, password);
  axiosConfig = getAxiosConfig(accessToken);
  customerProfile = {
    name: findName(),
    userId: id,
  };
});

describe('Customer routes should', () => {
  describe('succeed on', () => {
    test('creating a new customer profile', async () => {
      const { status } = await axios.post(url, customerProfile, axiosConfig);
      expect(status).toBe(201);
    });
  });
});