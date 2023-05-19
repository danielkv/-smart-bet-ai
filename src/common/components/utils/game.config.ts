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
        url: '#',
    },
    {
        image: bacboImg,
        name: 'bacbo',
        label: 'Bac Bo',
        url: '#',
    },
    {
        image: dragonTigerImg,
        name: 'dragon-tiger',
        label: 'Dragon Tiger',
        url: '#',
    },
    {
        image: minesImg,
        name: 'mines',
        label: 'Mines',
        url: '#',
    },
    {
        image: penaltyImg,
        name: 'penalty',
        label: 'Penalty',
        url: '#',
    },
    {
        image: spaceManImg,
        name: 'space-man',
        label: 'Space Man',
        url: '#',
    },
]

export const GAMES_CONFIG_OBJ: Record<TGameType, IGameConfig> = GAMES_CONFIG.reduce((acc, game) => {
    acc[game.name] = game
    return acc
}, {} as Record<TGameType, IGameConfig>)
