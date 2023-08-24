import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOffer, TFullOffer } from '../types/offers.js';

import { saveToken, dropToken } from '../services/token';
//import { AuthorizationStatus } from '../const';
import { TAuthData } from '../types/auth-data';
import { TComment, TCommentData } from '../types/comments.js';
import { TUserData } from '../types/user-data.js';
//import { store } from './.';
import { APIRoute } from '../const';
import { AppDispatch, State } from '../types/state';

export const fetchOffersAction = createAsyncThunk<TOffer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TOffer[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchOfferAction = createAsyncThunk<TFullOffer, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'OFFER/fetch',
  async (offerId, { extra: api }) => {

    const { data } = await api
      .get<TFullOffer>(`${APIRoute.Offers}/${offerId}`);
    return data;
  }
);

export const fetchNearPlaceOfferAction = createAsyncThunk<TOffer[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'NEARPLACES/fetch',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<TOffer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    return data;
  }
);

export const fetchCommentsOfferAction = createAsyncThunk<TComment, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'REVIEWS/fetch',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<TComment[]>(`${APIRoute.Comments}/${offerId}`);
    return data;
  }
);

export const fetchFavoritesAction = createAsyncThunk<TOffer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'FAVORITES/fetch',
  async (_arg, { extra: api }) => {
    try {
      const { data } = await api.get<TOffer[]>(APIRoute.Favorites);
      return data;
    } catch {
      throw new Error();
    }
  }
);

export const postCommentOfferAction = createAsyncThunk<TComment, TCommentData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'REVIEWS/post',
  async ({ comment, rating, offerId }, { extra: api }) => {
    const { data } = await api.post<TComment>(`${APIRoute.Comments}/${offerId}`, { comment, rating });
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<TUserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TUserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<TUserData, TAuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, {extra: api }) => {
    const { data } = await api.post<TUserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
