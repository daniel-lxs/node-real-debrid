/// <reference types="node" />
import { AxiosResponse } from 'axios';
import { DefaultOptions, TimeResponse, TimeISOResponse, UserResponse, UnrestrictCheckResponse, UnrestrictLinkResponse, UnrestrictFolderResponse, TrafficResponse, TrafficDetailsResponse, StreamingTranscodeResponse, StreamingMediaInfosResponse, DownloadItem, TorrentItem, TorrentInfoResponse, TorrentAvailableHostsResponse, TorrentInstantAvailabilityResponse, HostsResponse, HostsStatusResponse, HostsRegexResponse, HostsDomainsResponse, ForumResponse, ForumTopicResponse, SettingsResponse } from './types';
import { Readable } from 'stream';
declare class RealDebridClient {
    private token;
    private defaultOptions;
    private base_url;
    time: {
        get: () => Promise<AxiosResponse<TimeResponse>>;
        ISO: () => Promise<AxiosResponse<TimeISOResponse>>;
    };
    user: {
        get: () => Promise<AxiosResponse<UserResponse>>;
    };
    unrestrict: {
        check: (link: string, password?: string | null) => Promise<AxiosResponse<UnrestrictCheckResponse>>;
        link: (link: string, password?: string | null, remote?: number) => Promise<AxiosResponse<UnrestrictLinkResponse>>;
        folder: (link: string) => Promise<AxiosResponse<UnrestrictFolderResponse>>;
        containerFile: (file: string | Readable) => Promise<AxiosResponse<any>>;
        containerLink: (link: string) => Promise<AxiosResponse<any>>;
    };
    traffic: {
        get: () => Promise<AxiosResponse<TrafficResponse>>;
        details: (start?: string | null, end?: string | null) => Promise<AxiosResponse<TrafficDetailsResponse>>;
    };
    streaming: {
        transcode: (id: string) => Promise<AxiosResponse<StreamingTranscodeResponse>>;
        mediaInfos: (id: string) => Promise<AxiosResponse<StreamingMediaInfosResponse>>;
    };
    downloads: {
        get: (offset?: number | null, page?: number | null, limit?: number) => Promise<AxiosResponse<DownloadItem[]>>;
        delete: (id: string) => Promise<AxiosResponse<any>>;
    };
    torrents: {
        get: (offset?: number | null, page?: number | null, limit?: number, filter?: string) => Promise<AxiosResponse<TorrentItem[]>>;
        info: (id: string) => Promise<AxiosResponse<TorrentInfoResponse>>;
        availableHosts: () => Promise<AxiosResponse<TorrentAvailableHostsResponse>>;
        instantAvailability: (infoHashes: string[]) => Promise<AxiosResponse<TorrentInstantAvailabilityResponse>>;
        addTorrent: (file: string | Readable, host?: string | null, split?: string | null) => Promise<AxiosResponse<any>>;
        addMagnet: (magnet: string, host?: string | null, split?: string | null) => Promise<AxiosResponse<any>>;
        selectFiles: (id: string, files?: string, check_cache?: number) => Promise<AxiosResponse<any>>;
        delete: (id: string) => Promise<AxiosResponse<any>>;
    };
    hosts: {
        get: () => Promise<AxiosResponse<HostsResponse>>;
        status: () => Promise<AxiosResponse<HostsStatusResponse>>;
        regex: () => Promise<AxiosResponse<HostsRegexResponse>>;
        domains: () => Promise<AxiosResponse<HostsDomainsResponse>>;
    };
    forum: {
        get: (id?: number | null) => Promise<AxiosResponse<ForumResponse | ForumTopicResponse>>;
        topic: (id: number) => Promise<AxiosResponse<ForumTopicResponse>>;
    };
    settings: {
        get: () => Promise<AxiosResponse<SettingsResponse>>;
        update: (setting_name?: string | null, setting_value?: string | null) => Promise<AxiosResponse<any>>;
        convertPoints: () => Promise<AxiosResponse<any>>;
        changePassword: () => Promise<AxiosResponse<any>>;
        avatarFile: (file: string | Readable) => Promise<AxiosResponse<any>>;
        deleteAvatar: () => Promise<AxiosResponse<any>>;
    };
    constructor(token: string, defaultOptions?: DefaultOptions);
    private _readFile;
    private _request;
    private _get;
    private _post;
    private _put;
    private _delete;
    disableAccessToken(): Promise<AxiosResponse<any>>;
    private _initMethods;
}
export default RealDebridClient;
