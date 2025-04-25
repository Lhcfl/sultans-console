/* eslint-disable @typescript-eslint/no-explicit-any */
// 自动转换的

export interface SaveFile {
  configId: number
  configVersion: number
  name: string
  difficulty: number
  round: number
  saveTime: string
  card_uid_index: number
  rite_uid_index: number
  sudan_box_show: boolean
  after_round_auto_sort: boolean
  sudan_card_init_life: number
  sudan_redraw_count: number
  sudan_redraw_times_per_round: number
  sudan_redraw_times: number
  sudan_redraw_times_recovery_round: number
  wizard_first_show: boolean
  success: boolean
  over_reason: number
  ithink_card: any
  cards: Card[]
  rites: Rite[]
  pins: number[]
  sudan_pool_cards: number[]
  sudan_pool: string
  sudan_card_pool: SudanCardPool[]
  sudan_pool_pos: number[]
  sudan_pool_init_count: number
  sudan_card_show_times: SudanCardShowTimes
  sudan_remove_count: number
  counter: Counter
  global_counter_cacher: GlobalCounterCacher
  random_cache: RandomCache
  only_cards: number[]
  only_rites: number[]
  event_status: EventStatus
  delay_ops: any[]
  end_rites: EndRites
  gen_cards: GenCards
  gen_tags: GenTags
  timing_rounds: Record<string, number>
  auto_result_rites: any[]
  notes: Note[][]
  once_new_rites_is_show: Record<string, boolean>
  cached_event: any[]
  BagIndex: number
  last_round_rite_data: unknown,
  rite_auto_result: boolean
  disable_auto_gen_sudan_card: boolean
  custom_rite_name: unknown
  end_open: boolean
  is_armageddon: boolean
  armageddon_rite_id: number
}

export interface Card {
  uid: number
  id: number
  count: number
  life: number
  rareup: number
  tag: Tag
  equip_slots: string[]
  equips: Equip[]
  bag: number
  bagpos: number
  custom_name: string
  custom_text: string
}

export type Tag = Record<string, number>;

export interface Equip {
  uid: number
  id: number
  count: number
  life: number
  rareup: number
  tag: Tag2
  equip_slots: any[]
  equips: any[]
  bag: number
  bagpos: number
  custom_name: string
  custom_text: string
}

export interface Tag2 {
  own?: number
  adsorb_spec?: number
  weapon_keep?: number
}

export interface Rite {
  uid: number
  id: number
  new_born: boolean
  is_show: boolean
  start: boolean
  start_round: number
  start_life: number
  life: number
  cards: Card2[]
  custom_name: string
}

export interface Card2 {
  uid: number
  id: number
  count: number
  life: number
  rareup: number
  tag: Tag3
  equip_slots: string[]
  equips: Equip2[]
  bag: number
  bagpos: number
  custom_name: string
  custom_text: string
}

export interface Tag3 {
  ennui?: number
  battle?: number
  physique?: number
  charm?: number
  survival?: number
  wisdom?: number
  social?: number
  conceal?: number
  magic?: number
  mark4?: number
  'dark_ knowledge'?: number
  blessing?: number
  tattoo?: number
  stackable?: number
  lock_87?: number
  adsorb_spec?: number
  adherent?: number
  lock_107?: number
  lock_105?: number
  longevity_mark?: number
}

export interface Equip2 {
  uid: number
  id: number
  count: number
  life: number
  rareup: number
  tag: Tag4
  equip_slots: any[]
  equips: any[]
  bag: number
  bagpos: number
  custom_name: string
  custom_text: string
}

export interface Tag4 {
  collected?: number
  battle?: number
  own?: number
  lock_8?: number
  adsorb_spec?: number
  weapon_keep?: number
}

export interface SudanCardPool {
  uid: number
  id: number
  count: number
  life: number
  rareup: number
  tag: Tag5
  equip_slots: any[]
  equips: any[]
  bag: number
  bagpos: number
  custom_name: string
  custom_text: string
}

export interface Tag5 {
  sudan_pool_index: number
  freeze: number
}

export type SudanCardShowTimes = Record<string, number>;

export type Counter = Record<string, number>;

export type GlobalCounterCacher = Record<string, number>;

export type RandomCache = Record<string, number>;

export type EventStatus = Record<string, boolean>;

export type EndRites = Record<string, number>;

export type GenCards = Record<string, number>;

export interface GenTags {
  sudan_pool_index: number
  physique: number
  charm: number
  wisdom: number
  man: number
  noble: number
  player: number
  battle: number
  social: number
  own: number
  support: number
  foreign_businessmen: number
  pure: number
  female: number
  wife: number
  lock_friendship: number
  like_reading: number
  oppose: number
  conceal: number
  survival: number
  general: number
  guard: number
  believer: number
  noyinpa: number
  magic: number
  'dark_ knowledge': number
  giaour: number
  lock_6: number
  lock_104: number
  lock_147: number
  whore: number
  criminal: number
  thief: number
  slave: number
  thought: number
  theme: number
  stackable: number
  love_treasure: number
  equipment: number
  lock_5: number
  lock_52: number
  adsorb_spec: number
  lock_13: number
  animal_handling: number
  animal: number
  weapon: number
  accessory: number
  cloth: number
  bow: number
  outer_road: number
  tribal_relics: number
  heirloom: number
  close: number
  monster: number
  gold_text: number
  mount: number
  prisoner: number
  zhewade: number
  gaisi: number
  minister: number
  lock_31: number
  lock_8: number
  lock_9: number
  lock_10: number
  lock_11: number
  lock_7: number
  falajie: number
  dressup: number
  dressup_1: number
  money: number
  reroll: number
  lock_18: number
  army: number
  lock_32: number
  lock_62: number
  lock_61: number
  lock_130: number
  lock_86: number
  adherent: number
  passion: number
  catcatcher: number
  unidentified: number
  coin: number
  consumable: number
  lock_12: number
  position: number
  lock_22: number
  war: number
  upgrade_point: number
  sudancard: number
  lock_63: number
  lock_136: number
  intelligent: number
  ennui: number
  read: number
  reading: number
  inspiration: number
  lock_23: number
  lock_39: number
  lock_30: number
  ithink: number
  evidence: number
  a_gift: number
  ornament: number
  release: number
  wastefulness: number
  rent: number
  mark4: number
  lock_99: number
  desire: number
  kill: number
  recovery: number
  weapon_keep: number
  lock_88: number
  open: number
  lock_48: number
  lock_49: number
  maybe: number
  feast: number
  calumny: number
  lock_79: number
  collected: number
  sky: number
  lock_132: number
  lock_35: number
  lock_56: number
  traces_of_desire: number
  displeased: number
  patience: number
  lock_102: number
  lock_100: number
  hostage: number
  lock_4: number
  lock_103: number
  piety: number
  pic: number
  fight_complete: number
  life_rod_user: number
  blessing: number
  lock_36: number
  lock_50: number
  lock_78: number
  lock_76: number
  sudan_miss: number
  lock_74: number
  lock_119: number
  lock_123: number
  lock_24: number
  lock_25: number
  lock_105: number
  lock_107: number
  lock_85: number
  mark2: number
  newlywed: number
  lock_34: number
  exclusive: number
  crazy: number
  lock_131: number
  longevity_mark: number
  tattoo: number
  lock_27: number
  lock_28: number
  lock_98: number
  lock_110: number
  lock_87: number
  freeze: number
  lock_15: number
  lock_73: number
  lock_92: number
  lock_90: number
  lock_91: number
}

export interface Note {
  type: number
  id: number
  uid: number
  count: number
}
