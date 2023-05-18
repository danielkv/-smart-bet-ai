import { IBacBoEntry } from '../../../src/common/interfaces/bac-bo'
import { IFinishedEntry, IGale, IPossibleEntry, IScore } from '../../../src/common/interfaces/common'
import { CIRCLE_COLORS } from '../utils/common'

import { MessageReaderBase } from './base'

export class BacBoMessageReader extends MessageReaderBase {
    readonly gameName = 'bacbo'

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

    private readConfirmed(message: string): IBacBoEntry | null {
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
            createdAt: Date.now(),
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

export const bacBoMessageReader = new BacBoMessageReader()
