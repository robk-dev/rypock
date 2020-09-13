import { ObjectId } from 'bson';

export namespace Models {
    export interface User {
        _id?: ObjectId;
        id: string;
        username: string;
        joined: number;
        picture?: string;
        description: any;
    }

    export interface Post {
        _id?: ObjectId;
        id: string;
        title: string;
        author_id: string;
        published: Date;
        edited: Date;
        deleted: boolean;
        v: string;
        tags: [string];
        data: [ArticleBody];
    }

    export interface Block {
        type: string;
        data?: {
            text: string;
            level?: number;
            style?: string;
            items?: [string];
            file?: { url?: string };
            caption?: string;
            withBorder?: string;
            stretched?: string;
            withBackground?: string;
        };
    }

    export interface ArticleBody {
        time: number;
        blocks: [Block];
        version: string;
    }

    export interface Account {
        _id?: ObjectId;
        id: string;
        first_name: string;
        last_name: string;
        username: string;
        email: string;
        password: string;
        joined: string;
        key_url: string;
        last_updated: string;
    }

    export interface UnsafeAccount {
        first_name: string;
        last_name: string;
        username: string;
        email: string;
        password: string;
        confirm_password: string;
        age: number;
    }
}
