import axios, { AxiosResponse } from 'axios';
import errorCodes from './ErrorCodes';
import {
  DefaultOptions,
  RequestOptions,
  TimeResponse,
  TimeISOResponse,
  UserResponse,
  UnrestrictCheckResponse,
  UnrestrictLinkResponse,
  UnrestrictFolderResponse,
  UnrestrictContainerResponse,
  TrafficResponse,
  TrafficDetailsResponse,
  StreamingTranscodeResponse,
  StreamingMediaInfosResponse,
  DownloadItem,
  TorrentItem,
  TorrentInfoResponse,
  TorrentAvailableHostsResponse,
  TorrentInstantAvailabilityResponse,
  TorrentAddResponse,
  HostsResponse,
  HostsStatusResponse,
  HostsRegexResponse,
  HostsDomainsResponse,
  ForumResponse,
  ForumTopicResponse,
  SettingsResponse
} from './types';
import { Readable } from 'stream';
import * as fs from 'fs';

class RealDebridClient {
  private token: string;
  private defaultOptions: DefaultOptions;
  private base_url: string;
  
  // API endpoints
  public time!: {
    get: () => Promise<AxiosResponse<TimeResponse>>;
    ISO: () => Promise<AxiosResponse<TimeISOResponse>>;
  };
  
  public user!: {
    get: () => Promise<AxiosResponse<UserResponse>>;
  };
  
  public unrestrict!: {
    check: (link: string, password?: string | null) => Promise<AxiosResponse<UnrestrictCheckResponse>>;
    link: (link: string, password?: string | null, remote?: number) => Promise<AxiosResponse<UnrestrictLinkResponse>>;
    folder: (link: string) => Promise<AxiosResponse<UnrestrictFolderResponse>>;
    containerFile: (file: string | Readable) => Promise<AxiosResponse<UnrestrictContainerResponse>>;
    containerLink: (link: string) => Promise<AxiosResponse<UnrestrictContainerResponse>>;
  };
  
  public traffic!: {
    get: () => Promise<AxiosResponse<TrafficResponse>>;
    details: (start?: string | null, end?: string | null) => Promise<AxiosResponse<TrafficDetailsResponse>>;
  };
  
  public streaming!: {
    transcode: (id: string) => Promise<AxiosResponse<StreamingTranscodeResponse>>;
    mediaInfos: (id: string) => Promise<AxiosResponse<StreamingMediaInfosResponse>>;
  };
  
  public downloads!: {
    get: (offset?: number | null, page?: number | null, limit?: number) => Promise<AxiosResponse<DownloadItem[]>>;
    delete: (id: string) => Promise<AxiosResponse<any>>;
  };
  
  public torrents!: {
    get: (offset?: number | null, page?: number | null, limit?: number, filter?: string) => Promise<AxiosResponse<TorrentItem[]>>;
    info: (id: string) => Promise<AxiosResponse<TorrentInfoResponse>>;
    availableHosts: () => Promise<AxiosResponse<TorrentAvailableHostsResponse>>;
    instantAvailability: (infoHashes: string[]) => Promise<AxiosResponse<TorrentInstantAvailabilityResponse>>;
    addTorrent: (file: string | Readable, host?: string | null, split?: string | null) => Promise<AxiosResponse<TorrentAddResponse>>;
    addMagnet: (magnet: string, host?: string | null, split?: string | null) => Promise<AxiosResponse<TorrentAddResponse>>;
    selectFiles: (id: string, files?: string, check_cache?: number) => Promise<AxiosResponse<void>>;
    delete: (id: string) => Promise<AxiosResponse<any>>;
  };
  
  public hosts!: {
    get: () => Promise<AxiosResponse<HostsResponse>>;
    status: () => Promise<AxiosResponse<HostsStatusResponse>>;
    regex: () => Promise<AxiosResponse<HostsRegexResponse>>;
    domains: () => Promise<AxiosResponse<HostsDomainsResponse>>;
  };
  
  public forum!: {
    get: (id?: number | null) => Promise<AxiosResponse<ForumResponse | ForumTopicResponse>>;
    topic: (id: number) => Promise<AxiosResponse<ForumTopicResponse>>;
  };
  
  public settings!: {
    get: () => Promise<AxiosResponse<SettingsResponse>>;
    update: (setting_name?: string | null, setting_value?: string | null) => Promise<AxiosResponse<any>>;
    convertPoints: () => Promise<AxiosResponse<any>>;
    changePassword: () => Promise<AxiosResponse<any>>;
    avatarFile: (file: string | Readable) => Promise<AxiosResponse<any>>;
    deleteAvatar: () => Promise<AxiosResponse<any>>;
  };

  constructor(token: string, defaultOptions: DefaultOptions = {}) {
    this.token = token;
    this.defaultOptions = defaultOptions;
    this.base_url = 'https://api.real-debrid.com/rest/1.0/';
    this._initMethods();
  }

  private _readFile(filePath: string): Readable {
    return fs.createReadStream(filePath);
  }

  private _request(endpoint: string, o: RequestOptions = {}): Promise<AxiosResponse<any>> {
    const url = this.base_url + endpoint;

    const options: RequestOptions = { ...this.defaultOptions };
    options.url = url;
    options.json = true;
    options.headers = options.headers || {};
    options.headers['Authorization'] = 'Bearer ' + this.token;

    for (let i in o) {
      options[i] = o[i];
    }

    return new Promise((resolve, reject) => {
      axios(options.url as string, options).then(resolve).catch(reject);
    });
  }

  private _get(endpoint: string, options: RequestOptions = {}): Promise<AxiosResponse<any>> {
    options.method = 'get';
    return this._request(endpoint, options);
  }

  private _post(endpoint: string, options: RequestOptions = {}): Promise<AxiosResponse<any>> {
    options.method = 'post';
    if (this.defaultOptions.ip && options.form) {
      options.form.ip = this.defaultOptions.ip;
    }
    return this._request(endpoint, options);
  }

  private _put(endpoint: string, options: RequestOptions = {}): Promise<AxiosResponse<any>> {
    options.method = 'put';
    return this._request(endpoint, options);
  }

  private _delete(endpoint: string, options: RequestOptions = {}): Promise<AxiosResponse<any>> {
    options.method = 'delete';
    return this._request(endpoint, options);
  }

  public disableAccessToken(): Promise<AxiosResponse<any>> {
    return this._get('disable_access_token');
  }

  private _initMethods(): void {
    this.time = {
      get: (): Promise<AxiosResponse<TimeResponse>> => {
        return this._get('time');
      },
      ISO: (): Promise<AxiosResponse<TimeISOResponse>> => {
        return this._get('time/iso');
      }
    };

    this.user = {
      get: (): Promise<AxiosResponse<UserResponse>> => {
        return this._get('user');
      }
    };

    this.unrestrict = {
      check: (link: string, password: string | null = null): Promise<AxiosResponse<UnrestrictCheckResponse>> => {
        return this._post('unrestrict/check', {
          data: `link=${link}&password=${password}`
        });
      },
      link: (link: string, password: string | null = null, remote: number = 0): Promise<AxiosResponse<UnrestrictLinkResponse>> => {
        return this._post('unrestrict/link', {
          data: `link=${link}&password=${password}&remote=${remote}`
        });
      },
      folder: (link: string): Promise<AxiosResponse<UnrestrictFolderResponse>> => {
        return this._post('unrestrict/folder', {
          data: `link=${link}`
        });
      },
      containerFile: (file: string | Readable): Promise<AxiosResponse<UnrestrictContainerResponse>> => {
        let stream: Readable;
        if (typeof file === 'string') {
          stream = this._readFile(file);
        } else {
          stream = file;
        }
        return this._put('unrestrict/containerFile', {
          body: stream,
          binary: true,
          json: false,
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        });
      },
      containerLink: (link: string): Promise<AxiosResponse<UnrestrictContainerResponse>> => {
        return this._post('unrestrict/containerLink', {
          data: `link=${link}`
        });
      }
    };

    this.traffic = {
      get: (): Promise<AxiosResponse<TrafficResponse>> => {
        return this._get('traffic');
      },
      details: (start: string | null = null, end: string | null = null): Promise<AxiosResponse<TrafficDetailsResponse>> => {
        return this._get('traffic/details', {
          qs: {
            start,
            end
          }
        });
      }
    };

    this.streaming = {
      transcode: (id: string): Promise<AxiosResponse<StreamingTranscodeResponse>> => {
        return this._get('streaming/transcode/' + id);
      },
      mediaInfos: (id: string): Promise<AxiosResponse<StreamingMediaInfosResponse>> => {
        return this._get('streaming/mediaInfos/' + id);
      }
    };

    this.downloads = {
      get: (offset: number | null = null, page: number | null = null, limit: number = 50): Promise<AxiosResponse<DownloadItem[]>> => {
        return this._get('downloads', {
          qs: {
            offset,
            page,
            limit
          }
        });
      },
      delete: (id: string): Promise<AxiosResponse<any>> => {
        return this._delete('downloads/delete/' + id);
      }
    };

    this.torrents = {
      get: (offset: number | null = null, page: number | null = null, limit: number = 50, filter: string = ''): Promise<AxiosResponse<TorrentItem[]>> => {
        return this._get('torrents', {
          qs: {
            offset,
            page,
            limit,
            filter
          }
        });
      },
      info: (id: string): Promise<AxiosResponse<TorrentInfoResponse>> => {
        return this._get('torrents/info/' + id);
      },
      availableHosts: (): Promise<AxiosResponse<TorrentAvailableHostsResponse>> => {
        return this._get('torrents/availableHosts');
      },
      instantAvailability: (infoHashes: string[]): Promise<AxiosResponse<TorrentInstantAvailabilityResponse>> => {
        return this._get(`torrents/instantAvailability/${infoHashes.join('/')}`);
      },
      addTorrent: (file: string | Readable, host: string | null = null, split: string | null = null): Promise<AxiosResponse<TorrentAddResponse>> => {
        let stream: Readable;
        if (typeof file === 'string') {
          stream = this._readFile(file);
        } else {
          stream = file;
        }
        return this._put('torrents/addTorrent', {
          body: stream,
          binary: true,
          json: false,
          qs: {
            host: host,
            split: split
          },
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        });
      },
      addMagnet: (magnet: string, host: string | null = null, split: string | null = null): Promise<AxiosResponse<TorrentAddResponse>> => {
        return this._post('torrents/addMagnet', {
          data: `magnet=${magnet}&host=${host}&split=${split}`
        });
      },
      selectFiles: (id: string, files: string = 'all', check_cache: number = 1): Promise<AxiosResponse<void>> => {
        return this._post('torrents/selectFiles/' + id, {
          data: `files=${files}&check_cache=${check_cache}`
        });
      },
      delete: (id: string): Promise<AxiosResponse<any>> => {
        return this._delete('torrents/delete/' + id);
      }
    };

    this.hosts = {
      get: (): Promise<AxiosResponse<HostsResponse>> => {
        return this._get('hosts');
      },
      status: (): Promise<AxiosResponse<HostsStatusResponse>> => {
        return this._get('hosts/status');
      },
      regex: (): Promise<AxiosResponse<HostsRegexResponse>> => {
        return this._get('hosts/regex');
      },
      domains: (): Promise<AxiosResponse<HostsDomainsResponse>> => {
        return this._get('hosts/domains');
      }
    };

    this.forum = {
      get: (id: number | null = null): Promise<AxiosResponse<ForumResponse | ForumTopicResponse>> => {
        if (typeof id === 'undefined' || id === null) {
          return this._get('forum');
        } else {
          return this._get('forum/' + id);
        }
      },
      topic: (id: number): Promise<AxiosResponse<ForumTopicResponse>> => {
        return this.forum.get(id) as Promise<AxiosResponse<ForumTopicResponse>>;
      }
    };

    this.settings = {
      get: (): Promise<AxiosResponse<SettingsResponse>> => {
        return this._get('settings');
      },
      update: (setting_name: string | null = null, setting_value: string | null = null): Promise<AxiosResponse<any>> => {
        return this._post('settings/update', {
          data: `setting_name=${setting_name}&setting_value=${setting_value}`
        });
      },
      convertPoints: (): Promise<AxiosResponse<any>> => {
        return this._post('settings/convertPoints');
      },
      changePassword: (): Promise<AxiosResponse<any>> => {
        return this._post('settings/changePassword');
      },
      avatarFile: (file: string | Readable): Promise<AxiosResponse<any>> => {
        let stream: Readable;
        if (typeof file === 'string') {
          stream = this._readFile(file);
        } else {
          stream = file;
        }
        return this._put('settings/avatarFile', {
          body: stream,
          binary: true,
          json: false,
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        });
      },
      deleteAvatar: (): Promise<AxiosResponse<any>> => {
        return this._delete('settings/avatarDelete');
      }
    };
  }
}

export default RealDebridClient; 