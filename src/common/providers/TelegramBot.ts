import dayjs from 'dayjs'
import EventEmitter from 'events'
import TypedEmitter from 'typed-emitter'

import { Message, Update } from '../interfaces/telegrambot'

const TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN

type TTelegramBotEvents = {
    message: (message: Message) => void
    getUpdates: (updates: Update[]) => void
}

class TelegramBot extends (EventEmitter as new () => TypedEmitter<TTelegramBotEvents>) {
    private apiUrl = 'https://api.telegram.org/bot'
    private getUpdatesUrl!: string
    public _isPolling = false
    private pollingInterval!: NodeJS.Timeout
    private offset = 0
    private limit = 100

    get isPolling() {
        return this._isPolling
    }

    set isPolling(value: boolean) {
        this._isPolling = value
        if (!value && this.pollingInterval) clearInterval(this.pollingInterval)
    }

    constructor(private readonly token: string) {
        super()
        this.getUpdatesUrl = this.apiUrl + token + '/getUpdates'
    }

    startPolling(interval = 1000) {
        if (!this.isPolling) this.isPolling = true

        this.poll().finally(() => {
            this.pollingInterval = setTimeout(() => {
                this.startPolling(interval)
            }, interval)
        })
    }

    stopPolling() {
        this.isPolling = false
    }

    private async poll() {
        const updates = await this.getUpdates()

        const emitMessages = new Promise((resolve) => {
            if (this.listenerCount('message') >= 1) {
                updates.forEach((update) => {
                    if (!update.channel_post) return

                    this.emit('message', update.channel_post)
                })
            }

            if (updates.length) {
                const updateId = updates.at(-1)?.update_id || 0
                this.offset = updateId + 1
            }

            this.emit('getUpdates', updates)

            resolve(true)
        })

        await Promise.resolve(emitMessages)
    }

    async getUpdates(): Promise<Update[]> {
        const response = await fetch(this.getUpdatesUrl + `?limit=${this.limit}&offset=${this.offset}`, {
            method: 'GET',
        })

        const { result } = await response.json()

        return result as Update[]
    }
}

export const telegramBot = new TelegramBot(TOKEN)
