export interface DefaultOptions {
    ip?: string;
    headers?: Record<string, string>;
    [key: string]: any;
}
export interface RequestOptions {
    method?: string;
    url?: string;
    headers?: Record<string, string>;
    data?: any;
    form?: any;
    qs?: Record<string, any>;
    body?: any;
    binary?: boolean;
    json?: boolean;
    [key: string]: any;
}
export interface TimeResponse {
    server_time: number;
    server_timezone: string;
}
export interface TimeISOResponse {
    iso: string;
}
export interface UserResponse {
    id: number;
    username: string;
    email: string;
    points: number;
    locale: string;
    avatar: string;
    type: string;
    premium: number;
    expiration: string;
}
export interface UnrestrictCheckResponse {
    host: string;
    link: string;
    filename: string;
    filesize: number;
    supported: number;
}
export interface UnrestrictLinkResponse {
    id: string;
    filename: string;
    mimeType: string;
    filesize: number;
    link: string;
    host: string;
    chunks: number;
    crc: number;
    download: string;
    streamable: number;
}
export interface UnrestrictFolderResponse {
    [key: string]: UnrestrictLinkResponse;
}
export interface TrafficResponse {
    limited: boolean;
    [host: string]: any;
}
export interface TrafficDetailsResponse {
    [date: string]: {
        [host: string]: number;
    };
}
export interface StreamingTranscodeResponse {
    apple: boolean;
    dash: boolean;
    liveMP4: boolean;
    h264WebM: boolean;
}
export interface StreamingMediaInfosResponse {
    filename: string;
    original_audio: {
        id: number;
        language: string;
        name: string;
    }[];
    original_subtitle: {
        id: number;
        language: string;
        name: string;
    }[];
}
export interface DownloadItem {
    id: string;
    filename: string;
    mimeType: string;
    filesize: number;
    link: string;
    host: string;
    chunks: number;
    download: string;
    generated: string;
    type: string;
}
export interface TorrentItem {
    id: string;
    filename: string;
    hash: string;
    bytes: number;
    host: string;
    split: number;
    progress: number;
    status: string;
    added: string;
    links: string[];
    ended: string | null;
    speed: number | null;
    seeders: number | null;
}
export interface TorrentInfoResponse extends TorrentItem {
    original_filename: string;
    original_bytes: number;
    files: {
        id: number;
        path: string;
        bytes: number;
        selected: number;
    }[];
}
export interface TorrentAvailableHostsResponse {
    [host: string]: {
        max_size: number;
    };
}
export interface TorrentInstantAvailabilityResponse {
    [hash: string]: {
        [host: string]: {
            [fileId: string]: {
                filename: string;
                filesize: number;
            }[];
        };
    };
}
export interface HostsResponse {
    [host: string]: {
        id: string;
        name: string;
        image: string;
        supported: number;
    };
}
export interface HostsStatusResponse {
    [host: string]: {
        status: string;
        supported: number;
        check_time: number;
    };
}
export interface HostsRegexResponse {
    [host: string]: string;
}
export interface HostsDomainsResponse {
    [host: string]: string[];
}
export interface ForumResponse {
    id: number;
    name: string;
    topics_count: number;
}
export interface ForumTopicResponse {
    id: number;
    name: string;
    messages: {
        id: number;
        user: {
            id: number;
            username: string;
            avatar: string;
        };
        text: string;
        html: string;
        added: string;
    }[];
}
export interface SettingsResponse {
    download_port: number;
    streaming_port: number;
    language: string;
}
export interface ErrorCodes {
    [code: string]: string;
}
