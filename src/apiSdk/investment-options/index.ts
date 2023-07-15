import axios from 'axios';
import queryString from 'query-string';
import { InvestmentOptionInterface, InvestmentOptionGetQueryInterface } from 'interfaces/investment-option';
import { GetQueryInterface } from '../../interfaces';

export const getInvestmentOptions = async (query?: InvestmentOptionGetQueryInterface) => {
  const response = await axios.get(`/api/investment-options${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createInvestmentOption = async (investmentOption: InvestmentOptionInterface) => {
  const response = await axios.post('/api/investment-options', investmentOption);
  return response.data;
};

export const updateInvestmentOptionById = async (id: string, investmentOption: InvestmentOptionInterface) => {
  const response = await axios.put(`/api/investment-options/${id}`, investmentOption);
  return response.data;
};

export const getInvestmentOptionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/investment-options/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteInvestmentOptionById = async (id: string) => {
  const response = await axios.delete(`/api/investment-options/${id}`);
  return response.data;
};
