import { IScore, TGameType } from '../../../src/common/interfaces/common'

export abstract class MessageReaderBase {
    readonly gameName!: TGameType

    protected readOdds(message: string): string | undefined {
        const regex = /💸Odd (?<odds>.*)$/im

        const match = message.match(regex)
        if (!match?.groups?.odds) return undefined

        return match.groups.odds
    }

    protected readScore(message: string): IScore | null {
        const typeRegex =
            /🚀 Placar (?:do dia )?🟢 (?<greens>\d+) 🔴 (?<reds>\d+)\s?\n🎯 Acertamos (?<pct>[\d\.]+)% das vezes\s?\n💰 Estamos com (?<consecutive>\d+) Greens seguidos!?/

        const matchType = message.match(typeRegex)
        if (
            !matchType?.groups?.greens ||
            !matchType?.groups?.reds ||
            !matchType?.groups?.pct ||
            !matchType?.groups?.consecutive
        )
            return null

        const { greens, reds, pct, consecutive } = matchType.groups

        return {
            type: 'score',
            greens: Number(greens),
            reds: Number(reds),
            pct: Number(pct),
            consecutiveGreens: Number(consecutive),
            createdAt: Date.now(),
            game: this.gameName,
        }
    }
}
