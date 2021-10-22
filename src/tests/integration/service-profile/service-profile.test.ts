import { IProfileDto } from '../../../api/entities/dtos/profile-dtos';
import { IServiceProfileDto } from '../../../api/entities/dtos/service-profile-dtos';
import {
  createAccountAsync,
  deleteAccountAsync,
  generateRandomAccount,
} from '../../apis/account-api';
import {
  createProfileAsync,
  generateRandomProfile,
} from '../../apis/profile/profile-api';
import { generateRandomComment } from '../../apis/profile/profile-rating-api';
import {
  createServiceProfileAsync,
  deleteServiceProfileAsync,
  generateRandomServiceProfile,
  getAllServiceProfilesAsync,
  getAllServiceProfilesFromProfileAsync,
  getServiceProfileAsync,
  updateServiceProfileAsync,
} from '../../apis/service-profile/service-profile-api';

let serviceProfile: IServiceProfileDto;
let serviceProfileId: string;
let profile: IProfileDto;
let profileId: string;
let accountId: string;

beforeAll(async () => {
  const account = generateRandomAccount();
  const { data: accountData } = await createAccountAsync(account);
  accountId = accountData.id;
  profile = generateRandomProfile();
  const { data: profileData } = await createProfileAsync(accountId, profile);
  profileId = profileData.id;
  serviceProfile = generateRandomServiceProfile();
});

describe('Service routes should', () => {
  describe('succeed on', () => {
    test('creating a new service profile', async () => {
      const { data, status } = await createServiceProfileAsync(
        accountId,
        profileId,
        serviceProfile
      );
      serviceProfileId = data.id;
      expect(status).toBe(201);
    });

    test('getting service profile', async () => {
      const { status, data } = await getServiceProfileAsync(
        profileId,
        serviceProfileId
      );
      expect(data).toBeTruthy();
      expect(status).toBe(200);
    });

    test('getting all service profiles from profile', async () => {
      const { status, data } = await getAllServiceProfilesFromProfileAsync(
        profileId
      );
      expect(data).toHaveLength(1);
      expect(status).toBe(200);
    });

    test('getting all service profiles', async () => {
      const { status, data } = await getAllServiceProfilesAsync();
      expect(data).toHaveLength(1);
      expect(status).toBe(200);
    });

    test('updating service profile description', async () => {
      const { status } = await updateServiceProfileAsync(
        accountId,
        profileId,
        serviceProfileId,
        {
          description: generateRandomComment(),
        }
      );
      expect(status).toBe(204);
    });

    test('deleting service profile', async () => {
      const { status } = await deleteServiceProfileAsync(
        accountId,
        profileId,
        serviceProfileId
      );
      expect(status).toBe(204);
    });
  });
});

afterAll(async () => {
  await deleteAccountAsync(accountId);
});
