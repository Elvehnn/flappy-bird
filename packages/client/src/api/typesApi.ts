export type ResponseStatus = {
    ok: string;
    status: number;
};

export interface YandexServiceIdResponse extends Response {
    data: { service_id: string };
}

export type LoginRequestData = {
    login: string;
    password: string;
};

export type GetUserByLoginRequestData = {
    login: string;
};

export type ChangeProfileKeys =
    | "login"
    | "first_name"
    | "second_name"
    | "phone"
    | "email"
    | "display_name";

export type ChangeProfileRequestData = Record<ChangeProfileKeys, string>;

export type UserFromServer = ChangeProfileRequestData & {
    id: number;
    avatar: string;
};

export interface signupRequestData {
    email: string;
    first_name: string;
    login: string;
    password: string;
    phone: string;
    second_name: string;
}

export interface signupResponseData extends Response {
    id: number;
}

export type UserInfoRequestData = {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
};

export interface LeaderBoardUser {
    date: string;
    name: string;
    score: number;
}

export interface LeaderBoardRequestData {
    data: {
        result: LeaderBoardUser;
    };
}

export interface ForumTheme {
    theme_id: number,
    main_theme_id: number,
    title: string,
    description: string,
    created: string
}

export interface ForumComment {
    comment_id: number,
    theme_id: number,
    body: string,
    created: string,
    created_by: string
}
