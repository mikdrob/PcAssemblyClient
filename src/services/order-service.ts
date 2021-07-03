import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ApiBaseUrl } from '../configuration';
import { IFetchResponse } from '../types/IFetchResponse';
import { IMessages } from '../types/IMessages';
import { IOrderItem } from '../types/IOrderItem';

export abstract class OrderService {

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

    static async postOrderDetails(apiEndpoint: string, orderDetailsData: 
        {firstName: string, lastName: string, email: string}
        ): Promise<IFetchResponse<IOrderItem>> {

        let orderDataJson = JSON.stringify(orderDetailsData);
        try {
            let response = await this.axios.post<IOrderItem>(apiEndpoint, orderDataJson);
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