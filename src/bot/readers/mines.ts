import dayjs from 'dayjs'

import { IFinishedEntry, IPossibleEntry } from '../../../src/common/interfaces/common'
import { IMinesEntry } from '../../../src/common/interfaces/mines'

import { MessageReaderBase } from './base'

export class MinesMessageReader extends MessageReaderBase {
    readonly gameName = 'mines'

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
        const typeRegex = /^🔹\sSinal Finalizado🔹/
        const entryRegex = /🕑\sFinalizado às (?<time>\d\d\:\d\d)\n✅✅✅GREEN✅✅✅/

        const matchType = message.match(typeRegex)
        if (!matchType) return null

        const matchEntry = message.match(entryRegex)
        if (!matchEntry?.groups?.time) return null

        return {
            type: 'finished',
            time: matchEntry.groups.time,
            result: 'green',
            createdAt: Date.now(),
            game: this.gameName,
        }
    }

    private readConfirmed(message: string): IMinesEntry | null {
        const typeRegex = /^🔔\sEntrada Confirmada\s🔔/m
        const entryRegex =
            /(💣\s\sMinas:\s(?<mines>\d+))\s?\n(🎯\s\sNº de tentativas:\s(?<tries>\d+))\s?\n(⏱\s\sSinal válido até (?<expiresAt>\d\d\:\d\d))/
        const mapRegex = /Mines Bet7k\n\n([(?:🟦|⭐)(?:\s?\n)]*)/

        const matchType = message.match(typeRegex)
        if (!matchType) return null

        const matchEntry = message.match(entryRegex)
        if (!matchEntry?.groups?.mines && !matchEntry?.groups?.tries && !matchEntry?.groups?.expiresAt) return null

        const matchMap = message.match(mapRegex)
        if (!matchMap) return null

        const rows = matchMap[1].trim().split('\n')

        const map = rows.map((row) => {
            const items = row.trim().replaceAll('\ud83d\udfe6', 'n').replaceAll('\u2B50', 's').split('')
            return items.map((item) => (item == 's' ? 'star' : 'none'))
        })

        const [minute, second] = matchEntry.groups.expiresAt.split(':')

        return {
            type: 'entry',
            mines: matchEntry?.groups?.mines ? Number(matchEntry.groups.mines) : undefined,
            tries: matchEntry?.groups?.tries ? Number(matchEntry.groups.tries) : undefined,
            expiresAt: dayjs().set('second', Number(second)).set('minute', Number(minute)).millisecond(),
            map,
            createdAt: Date.now(),
            game: this.gameName,
        }
    }
}

export const minesMessageReader = new MinesMessageReader()
