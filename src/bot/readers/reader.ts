import { TSignal } from '../../common/interfaces/common'
import { Message } from '../../common/interfaces/telegrambot'
import { telegramBot } from '../../common/providers/TelegramBot'

import { aviatorMessageReader } from './aviator'
import { bacBoMessageReader } from './bac-bo'
import { dragonTigerMessageReader } from './dragon-tiger'
import { minesMessageReader } from './mines'
import { penaltyMessageReader } from './penalty'
import { spaceManMessageReader } from './space-man'

class MessageProcessor {
    static readonly MINES = -1001959917962
    static readonly BACBO = -1001848957946
    static readonly AVIATOR = -1001980991166
    static readonly SPACE_MAN = -1001916125758
    static readonly PENALTY = -1001960711676
    static readonly DRAGON_TIGER = -1001980000545

    static readonly CHANNEL_IDS = {
        [MessageProcessor.MINES]: minesMessageReader,
        [MessageProcessor.BACBO]: bacBoMessageReader,
        [MessageProcessor.AVIATOR]: aviatorMessageReader,
        [MessageProcessor.SPACE_MAN]: spaceManMessageReader,
        [MessageProcessor.PENALTY]: penaltyMessageReader,
        [MessageProcessor.DRAGON_TIGER]: dragonTigerMessageReader,
    }

    async process(message: Message, cb: (signal: TSignal) => void | Promise<void>, channelId?: number) {
        const text = message.text
        if (!text) throw new Error('The message has no text')

        const messageChannelId = message.chat.id.toString() as unknown as keyof typeof MessageProcessor.CHANNEL_IDS
        if (channelId && channelId !== messageChannelId) return

        const game = MessageProcessor.CHANNEL_IDS[messageChannelId]
        if (!game) throw new Error(`Game not found `)

        const signal = game.process(text)
        if (!signal) throw new Error(`${game.gameName}: No signal processed`)

        await Promise.resolve(cb(signal))
    }

    listen(cb: (signal: TSignal) => void | Promise<void>, channelId?: number) {
        const listener = (m: Message) => {
            this.process(m, cb, channelId).catch((err) => {
                console.error(err)
            })
        }

        telegramBot.on('message', listener)
        telegramBot.startPolling(5000)

        return () => {
            telegramBot.stopPolling()
            telegramBot.removeListener('message', listener)
        }
    }
}

export const messageReader = new MessageProcessor()
