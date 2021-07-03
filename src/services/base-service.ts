import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ApiBaseUrl } from '../configuration';
import { IFetchResponse } from '../types/IFetchResponse';
import { IMessages } from '../types/IMessages';

export abstract class BaseService {

    protected static axios = Axios.create({
        baseURL: ApiBaseUrl,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    protected static getAxiosConfiguration(token?: string): AxiosRequestConfig | undefined {
        if(!token) return undefined;
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        return config;
    }

    static async getAll<TEntity>(apiEndpoint: string, token?: string): Promise<IFetchResponse<TEntity[]>> {
        try{
        let response = await this.axios.get<TEntity[]>(apiEndpoint, BaseService.getAxiosConfiguration(token));
        return {
            ok: response.status <=299,
            statusCode: response.status,
            data: response.data,
        };
    }
    catch (err){
        let error = err as AxiosError;
        return {
            ok: false,
            statusCode: error.response?.status ?? 500,
            messages: (error.response?.data as IMessages).messages
        }
    }
    }
    static async get<TEntity>(apiEndpoint: string, id: string, token?: string): Promise<IFetchResponse<TEntity>> {
        apiEndpoint = apiEndpoint + '/' + id;
        try{
        let response = await this.axios.get<TEntity>(apiEndpoint, BaseService.getAxiosConfiguration(token));
        return {
            ok: response.status <=299,
            statusCode: response.status,
            data: response.data,
        };
    }
    catch (err){
        let error = err as AxiosError;
        return {
            ok: false,
            statusCode: error.response?.status ?? 500,
            messages: (error.response?.data as IMessages).messages
        }
    }
    }
}