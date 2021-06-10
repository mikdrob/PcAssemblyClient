import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ApiBaseUrl } from '../configuration';
import { IItem } from '../domain/IItem';
import { IFetchResponse } from '../types/IFetchResponse';
import { IMessages } from '../types/IMessages';
import { IOrderItem } from '../types/IOrderItem';
import { IOrderResponse } from '../types/IOrderResponse';

export abstract class ItemsService {

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

    static async postOrder(apiEndpoint: string, orderData: {item: IItem, orderItem: IOrderItem}): Promise<IFetchResponse<IOrderResponse>> {
        let orderDataJson = JSON.stringify(orderData);
        try {
            let response = await this.axios.post<IOrderResponse>(apiEndpoint, orderDataJson);
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data
            };    
        }
        catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages,
            }
        }

    }

    
}