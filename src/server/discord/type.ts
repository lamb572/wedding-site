export interface DiscordMessage {
  content: string
  username?: string
  avatar_url?: string
  tts?: boolean
  embeds?: Embed[]
  allowed_mentions?: AllowedMentions
  components?: MessageComponent[]
  files?: FileContent[]
  payload_json?: string
  attachments?: PartialAttachment[]
  flags?: number
  thread_name?: string
  applied_tags?: string[]
}

export interface Embed {
  title?: string
  type?: string
  description?: string
  url?: string
  timestamp?: string
  color?: number
  footer?: EmbedFooter
  image?: EmbedImage
  thumbnail?: EmbedThumbnail
  video?: EmbedVideo
  provider?: EmbedProvider
  author?: EmbedAuthor
  fields: Field[]
}

export interface EmbedFooter {
  text: string
  icon_url?: string
  proxy_icon_url?: string
}

export interface EmbedImage {
  url: string
  proxy_url?: string
  height?: number
  width?: number
}

export interface EmbedThumbnail {
  url: string
  proxy_url?: string
  height?: number
  width?: number
}

export interface EmbedVideo {
  url?: string
  height?: number
  width?: number
}

export interface EmbedProvider {
  name?: string
  url?: string
}

export interface EmbedAuthor {
  name: string
  url?: string
  icon_url?: string
  proxy_icon_url?: string
}
export interface Embed {
  fields: Field[]
}
export interface Field {
  name: string
  value: string
  inline?: boolean
}

export interface AllowedMentions {
  parse?: string[]
  roles?: string[]
  users?: string[]
  replied_user?: boolean
}

export interface MessageComponent {
  type: number
  components: Component[]
}

export interface Component {
  type: number
  custom_id?: string
  disabled?: boolean
  style?: number
  label?: string
  emoji?: Emoji
  url?: string
  options?: SelectOption[]
  placeholder?: string
  min_values?: number
  max_values?: number
  value?: string
}

export interface Emoji {
  id?: string
  name?: string
  animated?: boolean
}

export interface SelectOption {
  label: string
  value: string
  description?: string
  emoji?: Emoji
  default?: boolean
}

export interface FileContent {
  name: string
  file: Buffer
}

export interface PartialAttachment {
  id: string
  filename: string
  description?: string
}
