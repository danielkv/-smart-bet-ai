import { IAviatorEntry } from '../../common/interfaces/aviator'
import { IFinishedEntry, IGale, IPossibleEntry, IScore } from '../../common/interfaces/common'

import { MessageReaderBase } from './base'

export class AviatorMessageReader extends MessageReaderBase {
    readonly gameName = 'aviator'

    process(message: string) {
        const possibility = this.readPossibilities(message)
        if (possibility) return possibility

        const confirmed = this.readConfirmed(message)
        if (confirmed) return confirmed

        const gale = this.readGale(message)
        if (gale) return gale

        const score = this.readScore(message)
        if (score) return score

        const finished = this.readFinished(message)
        if (finished) return finished
    }

    private readPossibilities(message: string): IPossibleEntry | null {
        const typeRegex = /🚨\sALERTA, POSSÍVEL ENTRADA!/
        const entryRegex = /Banca recomendada,\s(?<entry>.*)/im

        const matchType = message.match(typeRegex)
        if (!matchType) return null

        const matchEntry = message.match(entryRegex)
        if (!matchEntry?.groups?.entry) return null

        const odds = this.readOdds(message)

        return {
            type: 'possible',
            entry: matchEntry.groups.entry,
            odds,
            createdAt: Date.now(),
            game: this.gameName,
        }
    }

    private readConfirmed(message: string): IAviatorEntry | null {
        const typeRegex = /^🚀AVIATOR CONFIRMADO/m
        const entryRegex = /⏱️Entrar após o (?<entry>.*)\n📩 Saia em (?<exit>.*)/

        const matchType = message.match(typeRegex)
        if (!matchType) return null

        const matchEntry = message.match(entryRegex)
        if (!matchEntry?.groups?.entry || !matchEntry?.groups?.exit) return null

        return {
            type: 'entry',
            entry: matchEntry.groups.entry,
            exit: matchEntry.groups.exit,
            createdAt: Date.now(),
            game: this.gameName,
        }
    }

    private readGale(message: string): IGale | null {
        const typeRegex = /🔁 Estamos no (?<gale>\d+)° gale/

        const matchType = message.match(typeRegex)
        if (!matchType?.groups?.gale) return null

        return {
            type: 'gale',
            round: Number(matchType.groups.gale),
            createdAt: Date.now(),
            game: this.gameName,
        }
    }

    private readFinished(message: string): IFinishedEntry | null {
        const typeRegex = /^✅ ✅ GREEN! ✅✅(?:\n(?<info>.*))?/

        const matchType = message.match(typeRegex)
        if (!matchType) return null

        return {
            type: 'finished',
            info: matchType.groups?.info,
            result: 'green',
            createdAt: Date.now(),
            game: this.gameName,
        }
    }
}

export const aviatorMessageReader = new AviatorMessageReader()
