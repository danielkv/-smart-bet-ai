import { IFinishedEntry, IGale, IPossibleEntry, IScore } from '../../../src/common/interfaces/common'
import { ISpaceManEntry } from '../../../src/common/interfaces/space-man'

import { MessageReaderBase } from './base'

export class SpaceManMessageReader extends MessageReaderBase {
    readonly gameName = 'space-man'

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

    private readConfirmed(message: string): ISpaceManEntry | null {
        const typeRegex = /^🚀SPACEMAN CONFIRMADO/m
        const entryRegex = /⏱️Entrar após o (?<entry>.*)\n📩 Saia em (?<exit>.*)/

        const matchType = message.match(typeRegex)
        if (!matchType) return null

        const matchEntry = message.match(entryRegex)
        if (!matchEntry?.groups?.entry || !matchEntry?.groups?.exit) return null

        return {
            type: 'entry',
            entry: matchEntry.groups.entry,
            exit: matchEntry.groups.exit,
            game: this.gameName,
            createdAt: Date.now(),
        }
    }

    private readGale(message: string): IGale | null {
        const typeRegex = /🔁 (Confirmar nova a entrada no|Estamos no) (?<gale>\d+)° gale/

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

export const spaceManMessageReader = new SpaceManMessageReader()
