import { jwtDecode } from 'jwt-decode';
import { StorageService } from '../services/storage.service';
import { TokenI } from '../interfaces/authentication.interface';

export function decodeToken(): TokenI {
  const _storageService = new StorageService();
  const accessToken = _storageService.getLocalStorage('ACCESS_TOKEN') || '';
  return jwtDecode(accessToken);
}
