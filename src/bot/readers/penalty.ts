import dayjs from 'dayjs'

import { IFinishedEntry, IPossibleEntry } from '../../../src/common/interfaces/common'
import { IPenaltyEntry } from '../../../src/common/interfaces/penalty'

import { MessageReaderBase } from './base'

export class PenaltyMessageReader extends MessageReaderBase {
    readonly hand = '\uD83E\uDDE4'
    readonly person = '🧍🏻'
    readonly ball = '⚽️'

    readonly gameName = 'penalty'

    process(message: string) {
        const possibility = this.readPossibilities(message)
        if (possibility) return possibility

        const confirmed = this.readConfirmed(message)
        if (confirmed) return confirmed

        const finished = this.readFinished(message)
        if (finished) return finished
    }

    private readPossibilities(message: string): IPossibleEntry | null {
        const typeRegex = /^.+Possíveis entradas detectadas/m
        const entryRegex = /Banca recomendada,\s(?<entry>.*)/im

        const matchType = message.match(typeRegex)
        if (!matchType) return null

        const matchEntry = message.match(entryRegex)
        if (!matchEntry?.groups?.entry) return null

        return {
            type: 'possible',
            entry: matchEntry.groups.entry,
            createdAt: Date.now(),
            game: this.gameName,
        }
    }

    private readFinished(message: string): IFinishedEntry | null {
        const typeRegex = /🔹  Sinal finalizado 🔹\n📢  Finalizado ás (?<time>\d\d\:\d\d)\n🟩 É GOOOOOOLL ⚽️⚽️⚽️/

        const matchType = message.match(typeRegex)
        if (!matchType?.groups?.time) return null

        return {
            type: 'finished',
            time: matchType.groups.time,
            result: 'green',
            createdAt: Date.now(),
            game: this.gameName,
        }
    }

    private readConfirmed(message: string): IPenaltyEntry | null {
        const typeRegex =
            /🔔 Entrada Confirmada 🔔 \n\n.*\n🎯Seleção: (?<team>.*)\n\n(?<map>[(?:⚽️|🧍🏻|🧤)\n\s]+)\n\n🎯 Nº de Tentativas: (?<tries>\d+)\n⏱ Válido até (?<expiresAt>\d\d\:\d\d)/

        const matchEntry = message.match(typeRegex)

        if (
            !matchEntry?.groups?.team ||
            !matchEntry?.groups?.map ||
            !matchEntry?.groups?.tries ||
            !matchEntry?.groups?.expiresAt
        )
            return null

        const plays = matchEntry.groups.map.replaceAll(' ', '').split('\n\n')

        const map = plays.map((play) => {
            const rows = play.split('\n')

            return rows.map((row) => {
                const items = row
                    .replaceAll(this.ball, 'b')
                    .replaceAll(this.hand, 'h')
                    .replaceAll(this.person, 'p')
                    .split('')
                return items.map((item) => {
                    switch (item) {
                        case 'b':
                            return 'ball'
                        case 'p':
                            return 'person'
                        case 'h':
                        default:
                            return 'hand'
                    }
                })
            })
        })

        const [minute, second] = matchEntry.groups.expiresAt.split(':')
        return {
            type: 'entry',
            team: matchEntry.groups.team,
            expiresAt: dayjs().set('second', Number(second)).set('minute', Number(minute)).millisecond(),
            tries: Number(matchEntry.groups.tries),
            map,
            createdAt: Date.now(),
            game: this.gameName,
        }
    }
}

export const penaltyMessageReader = new PenaltyMessageReader()
