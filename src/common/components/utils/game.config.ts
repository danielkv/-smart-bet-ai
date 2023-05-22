import aviatorImg from '../../../assets/games/aviator.jpg'
import bacboImg from '../../../assets/games/bacbo.jpg'
import dragonTigerImg from '../../../assets/games/dragon-tiger.jpg'
import minesImg from '../../../assets/games/mines.jpg'
import penaltyImg from '../../../assets/games/penalty.jpg'
import spaceManImg from '../../../assets/games/space-man.png'
import { IGameConfig, TGameType } from '../../interfaces/common'

export const GAMES_CONFIG: IGameConfig[] = [
    {
        image: aviatorImg,
        name: 'aviator',
        label: 'Aviator',
        url: 'https://go.aff.7k-partners.com/d5ls6qw1?source_id=AppInside-SmarBet',
    },
    {
        image: bacboImg,
        name: 'bacbo',
        label: 'Bac Bo',
        url: 'https://go.aff.7k-partners.com/3cwrzto4?source_id=AppInside-SmarBet',
    },
    {
        image: dragonTigerImg,
        name: 'dragon-tiger',
        label: 'Dragon Tiger',
        url: 'https://go.aff.7k-partners.com/nq3ksq4k?source_id=AppInside-SmarBet',
    },
    {
        image: minesImg,
        name: 'mines',
        label: 'Mines',
        url: 'https://go.aff.7k-partners.com/pmeqj4yw?source_id=AppInside-SmarBet',
    },
    {
        image: penaltyImg,
        name: 'penalty',
        label: 'Penalty',
        url: 'https://go.aff.7k-partners.com/mk1t5i3c?source_id=AppInside-SmarBet',
    },
    {
        image: spaceManImg,
        name: 'space-man',
        label: 'Space Man',
        url: 'https://go.aff.7k-partners.com/qqfesu96?source_id=AppInside-SmarBet',
    },
]

export const GAMES_CONFIG_OBJ: Record<TGameType, IGameConfig> = GAMES_CONFIG.reduce((acc, game) => {
    acc[game.name] = game
    return acc
}, {} as Record<TGameType, IGameConfig>)
