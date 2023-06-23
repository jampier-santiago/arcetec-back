// Packages
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

// interfaces
import { HttpAdapter } from '../interfaces/http-adapter.interface';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async post<T>(url: string, body: any): Promise<T> {
    throw new Error('Method not implemented.');
  }
  async put<T>(url: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  async delete<T>(url: string, body: any): Promise<T> {
    throw new Error('Method not implemented.');
  }
  private axios: AxiosInstance = axios;
}
