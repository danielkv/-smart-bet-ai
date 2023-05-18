export interface Update {
    update_id: number
    message?: Message | undefined
    edited_message?: Message | undefined
    channel_post?: Message | undefined
    edited_channel_post?: Message | undefined
}

export interface Message {
    message_id: number
    message_thread_id?: number | undefined
    from?: TelegramUser | undefined
    date: number
    chat: Chat
    text?: string | undefined
}

export interface TelegramUser {
    id: number
    is_bot: boolean
    first_name: string
    last_name?: string | undefined
    username?: string | undefined
    language_code?: string | undefined
}

export type ChatType = 'private' | 'group' | 'supergroup' | 'channel'

export interface Chat {
    id: number
    type: ChatType
    title?: string | undefined
    username?: string | undefined
    first_name?: string | undefined
    last_name?: string | undefined
    is_forum?: boolean | undefined

    active_usernames?: string[] | undefined
    emoji_status_custom_emoji_id?: string | undefined
    bio?: string | undefined
    has_restricted_voice_and_video_messages?: boolean | undefined
    join_to_send_messages?: boolean | undefined
    join_by_request?: boolean | undefined
    description?: string | undefined
    invite_link?: string | undefined
    has_aggressive_anti_spam_enabled?: boolean | undefined
    has_hidden_members?: boolean | undefined
    pinned_message?: Message | undefined
}
