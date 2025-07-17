import axios, { AxiosResponse } from 'axios';
import HttpClient, { HttpClientConfig, ApiResponse, ApiError } from '../HttpClient';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('HttpClient', () => {
  let httpClient: HttpClient;
  let mockAxiosInstance: jest.Mocked<any>;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Create a mock axios instance
    mockAxiosInstance = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    };

    // Mock axios.create to return our mock instance
    mockedAxios.create.mockReturnValue(mockAxiosInstance);
    
    // Create HttpClient instance
    httpClient = new HttpClient();
  });

  describe('Constructor', () => {
    it('should create axios instance with default configuration', () => {
      new HttpClient();
      
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: '',
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    it('should create axios instance with custom configuration', () => {
      const config: HttpClientConfig = {
        baseURL: 'https://api.example.com',
        timeout: 5000,
        headers: {
          'Authorization': 'Bearer token123',
          'Custom-Header': 'custom-value',
        },
      };

      new HttpClient(config);
      
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: 'https://api.example.com',
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer token123',
          'Custom-Header': 'custom-value',
        },
      });
    });
  });

  describe('GET method', () => {
    it('should make successful GET request', async () => {
      const mockResponse: AxiosResponse = {
        data: { id: 1, name: 'Test' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await httpClient.get('/users/1');

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/users/1', undefined);
      expect(result).toEqual({
        data: { id: 1, name: 'Test' },
        status: 200,
        statusText: 'OK',
      });
    });

    it('should make GET request with custom config', async () => {
      const mockResponse: AxiosResponse = {
        data: { users: [] },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const customConfig = { 
        headers: { 'Custom-Header': 'value' },
        timeout: 10000 
      };

      await httpClient.get('/users', customConfig);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/users', customConfig);
    });

    it('should handle GET request errors', async () => {
      const mockError = {
        response: {
          status: 404,
          data: { message: 'Not found' },
        },
        code: 'ERR_NOT_FOUND',
        message: 'Request failed with status code 404',
      };

      mockAxiosInstance.get.mockRejectedValue(mockError);

      await expect(httpClient.get('/users/999')).rejects.toEqual({
        message: 'Not found',
        status: 404,
        code: 'ERR_NOT_FOUND',
      });
    });
  });

  describe('POST method', () => {
    it('should make successful POST request', async () => {
      const mockResponse: AxiosResponse = {
        data: { id: 1, name: 'New User', email: 'user@example.com' },
        status: 201,
        statusText: 'Created',
        headers: {},
        config: {},
      };

      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const userData = { name: 'New User', email: 'user@example.com' };
      const result = await httpClient.post('/users', userData);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/users', userData, undefined);
      expect(result).toEqual({
        data: { id: 1, name: 'New User', email: 'user@example.com' },
        status: 201,
        statusText: 'Created',
      });
    });

    it('should make POST request without data', async () => {
      const mockResponse: AxiosResponse = {
        data: { success: true },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };

      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      await httpClient.post('/action');

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/action', undefined, undefined);
    });

    it('should make POST request with custom config', async () => {
      const mockResponse: AxiosResponse = {
        data: { success: true },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };

      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const data = { message: 'Hello' };
      const customConfig = { 
        headers: { 'Content-Type': 'application/xml' } 
      };

      await httpClient.post('/messages', data, customConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/messages', data, customConfig);
    });
  });

  describe('PUT method', () => {
    it('should make successful PUT request', async () => {
      const mockResponse: AxiosResponse = {
        data: { id: 1, name: 'Updated User' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };

      mockAxiosInstance.put.mockResolvedValue(mockResponse);

      const userData = { name: 'Updated User' };
      const result = await httpClient.put('/users/1', userData);

      expect(mockAxiosInstance.put).toHaveBeenCalledWith('/users/1', userData, undefined);
      expect(result.data).toEqual({ id: 1, name: 'Updated User' });
    });
  });

  describe('DELETE method', () => {
    it('should make successful DELETE request', async () => {
      const mockResponse: AxiosResponse = {
        data: { success: true },
        status: 204,
        statusText: 'No Content',
        headers: {},
        config: {},
      };

      mockAxiosInstance.delete.mockResolvedValue(mockResponse);

      const result = await httpClient.delete('/users/1');

      expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/users/1', undefined);
      expect(result.status).toBe(204);
    });
  });

  describe('Error handling', () => {
    it('should handle timeout errors', async () => {
      const mockError = {
        code: 'ECONNABORTED',
        message: 'timeout of 30000ms exceeded',
      };

      mockAxiosInstance.get.mockRejectedValue(mockError);

      await expect(httpClient.get('/slow-endpoint')).rejects.toEqual({
        message: 'Request timed out. Please try again.',
        code: 'ECONNABORTED',
      });
    });

    it('should handle network errors', async () => {
      const mockError = {
        code: 'ECONNRESET',
        message: 'Network Error',
      };

      mockAxiosInstance.get.mockRejectedValue(mockError);

      await expect(httpClient.get('/endpoint')).rejects.toEqual({
        message: 'Network Error',
        code: 'ECONNRESET',
      });
    });

    it('should handle response errors with custom message', async () => {
      const mockError = {
        response: {
          status: 400,
          data: { message: 'Validation failed' },
        },
        code: 'ERR_BAD_REQUEST',
        message: 'Request failed with status code 400',
      };

      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(httpClient.post('/users', {})).rejects.toEqual({
        message: 'Validation failed',
        status: 400,
        code: 'ERR_BAD_REQUEST',
      });
    });

    it('should handle response errors without custom message', async () => {
      const mockError = {
        response: {
          status: 500,
          data: {},
        },
        code: 'ERR_INTERNAL_ERROR',
        message: 'Internal Server Error',
      };

      mockAxiosInstance.get.mockRejectedValue(mockError);

      await expect(httpClient.get('/endpoint')).rejects.toEqual({
        message: 'Internal Server Error',
        status: 500,
        code: 'ERR_INTERNAL_ERROR',
      });
    });

    it('should handle non-axios errors', async () => {
      const mockError = new Error('Unknown error');

      mockAxiosInstance.get.mockRejectedValue(mockError);

      await expect(httpClient.get('/endpoint')).rejects.toEqual({
        message: 'An unexpected error occurred',
      });
    });

    it('should handle axios errors without response', async () => {
      const mockError = {
        code: 'ERR_NETWORK',
        message: 'Network connection failed',
      };

      // Mock axios.isAxiosError to return true
      (axios.isAxiosError as jest.Mock).mockReturnValue(true);

      mockAxiosInstance.get.mockRejectedValue(mockError);

      await expect(httpClient.get('/endpoint')).rejects.toEqual({
        message: 'Network connection failed',
        code: 'ERR_NETWORK',
      });
    });
  });

  describe('Type safety', () => {
    it('should return typed response for GET request', async () => {
      interface User {
        id: number;
        name: string;
        email: string;
      }

      const mockResponse: AxiosResponse<User> = {
        data: { id: 1, name: 'John Doe', email: 'john@example.com' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result: ApiResponse<User> = await httpClient.get<User>('/users/1');

      expect(result.data.id).toBe(1);
      expect(result.data.name).toBe('John Doe');
      expect(result.data.email).toBe('john@example.com');
    });

    it('should return typed response for POST request', async () => {
      interface CreateUserResponse {
        id: number;
        success: boolean;
      }

      const mockResponse: AxiosResponse<CreateUserResponse> = {
        data: { id: 1, success: true },
        status: 201,
        statusText: 'Created',
        headers: {},
        config: {},
      };

      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result: ApiResponse<CreateUserResponse> = await httpClient.post<CreateUserResponse>('/users', {});

      expect(result.data.id).toBe(1);
      expect(result.data.success).toBe(true);
    });
  });

  describe('isAxiosError behavior', () => {
    beforeEach(() => {
      // Reset the mock before each test
      (axios.isAxiosError as jest.Mock).mockReset();
    });

    it('should properly identify axios errors', async () => {
      const mockError = {
        response: {
          status: 404,
          data: { message: 'Not found' },
        },
        code: 'ERR_NOT_FOUND',
        message: 'Request failed',
      };

      (axios.isAxiosError as jest.Mock).mockReturnValue(true);
      mockAxiosInstance.get.mockRejectedValue(mockError);

      await expect(httpClient.get('/endpoint')).rejects.toEqual({
        message: 'Not found',
        status: 404,
        code: 'ERR_NOT_FOUND',
      });

      expect(axios.isAxiosError).toHaveBeenCalledWith(mockError);
    });

    it('should handle non-axios errors', async () => {
      const mockError = new Error('Some other error');

      (axios.isAxiosError as jest.Mock).mockReturnValue(false);
      mockAxiosInstance.get.mockRejectedValue(mockError);

      await expect(httpClient.get('/endpoint')).rejects.toEqual({
        message: 'An unexpected error occurred',
      });

      expect(axios.isAxiosError).toHaveBeenCalledWith(mockError);
    });
  });
});