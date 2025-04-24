export type ICardDefination = {
  id: number
  name: string
  title: string
  text: string
  card_favour: string
  type: string
  tips: string
  rare: number
  resource: string | string[]
  tag: Record<string, number>
  card_vanishing: number
  vanish: Vanish
  equips: string[]
  is_only: number
}

export interface Vanish {
  over?: number
}
