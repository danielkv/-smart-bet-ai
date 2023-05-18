import { IFinishedEntry, IGale, IPossibleEntry, IScore } from '../../../src/common/interfaces/common'
import { IDragonTigerEntry } from '../../../src/common/interfaces/dragon-tiger'
import { CIRCLE_COLORS } from '../utils/common'

import { MessageReaderBase } from './base'

export class DragonTigerMessageReader extends MessageReaderBase {
    readonly yellow = 128993
    readonly red = 128308
    readonly green = 128994
    readonly brown = 128996

    readonly gameName = 'dragon-tiger'

    process(message: string) {
        const confirmed = this.readConfirmed(message)
        if (confirmed) return confirmed

        const gale = this.readGale(message)
        if (gale) return gale

        const possible = this.readPossibilities(message)
        if (possible) return possible

        const score = this.readScore(message)
        if (score) return score

        const finished = this.readFinished(message)
        if (finished) return finished
    }

    private getCircleColor(circle: string): string | null {
        const color = CIRCLE_COLORS[String(circle.codePointAt(0)) as keyof typeof CIRCLE_COLORS]
        if (!color) return null

        return color
    }

    private readPossibilities(message: string): IPossibleEntry | null {
        const typeRegex = /⚠️ Possível sinal!/

        const matchType = message.match(typeRegex)
        if (!matchType) return null

        return {
            type: 'possible',
            entry: 'Aguarde confirmação',
            createdAt: Date.now(),
            game: this.gameName,
        }
    }

    private readConfirmed(message: string): IDragonTigerEntry | null {
        const typeRegex =
            /^🔔 Entre na cor (?<entry>.*)\n🛡 Proteção no (?<protection>.*)\n🎯 Estratégia: (?<strategy>.*)/

        const matchType = message.match(typeRegex)
        if (!matchType?.groups?.entry || !matchType?.groups?.protection || !matchType?.groups?.strategy) return null

        const entryColor = this.getCircleColor(matchType.groups.entry)
        const protectionColor = this.getCircleColor(matchType.groups.protection)

        if (!entryColor || !protectionColor) return null

        return {
            type: 'entry',
            entry: entryColor,
            protection: protectionColor,
            strategy: matchType.groups.strategy,
            game: this.gameName,
        }
    }

    private readGale(message: string): IGale | null {
        const typeRegex = /🔁 Confirmar nova a entrada no (?<gale>\d+)° gale/

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
        const typeRegex = /^✅ ✅ GREEN! ✅✅(?:\nSequência:\s?(?<info>.*))?/

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

export const dragonTigerMessageReader = new DragonTigerMessageReader()
