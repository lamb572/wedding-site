/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch"
  background?: string
  foreground?: string
  population?: number
  title?: string
}

export type SanityImagePalette = {
  _type: "sanity.imagePalette"
  darkMuted?: SanityImagePaletteSwatch
  lightVibrant?: SanityImagePaletteSwatch
  darkVibrant?: SanityImagePaletteSwatch
  vibrant?: SanityImagePaletteSwatch
  dominant?: SanityImagePaletteSwatch
  lightMuted?: SanityImagePaletteSwatch
  muted?: SanityImagePaletteSwatch
}

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions"
  height?: number
  width?: number
  aspectRatio?: number
}

export type SanityFileAsset = {
  _id: string
  _type: "sanity.fileAsset"
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  source?: SanityAssetSourceData
}

export type Geopoint = {
  _type: "geopoint"
  lat?: number
  lng?: number
  alt?: number
}

export type Slug = {
  _type: "slug"
  current: string
  source?: string
}

export type TextBlock = Array<{
  children?: Array<{
    marks?: Array<string>
    text?: string
    _type: "span"
    _key: string
  }>
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote"
  listItem?: "bullet" | "number"
  markDefs?: Array<
    | {
        color?:
          | "textSecondary"
          | "primary"
          | "secondary"
          | "success"
          | "error"
          | "info"
          | "warning"
          | "textPrimary"
          | "textDisabled"
        _type: "color"
        _key: string
      }
    | {
        href?: string
        _type: "link"
        _key: string
      }
  >
  level?: number
  _type: "block"
  _key: string
}>

export type HexColorPicker = string

export type Wedding = {
  _id: string
  _type: "wedding"
  _createdAt: string
  _updatedAt: string
  _rev: string
  date?: string
  brideName?: string
  groomName?: string
  brideImage?: string
  groomImage?: string
  brideDescription?: string
  groomDescription?: string
}

export type TravelAccommodation = {
  _id: string
  _type: "travelAccommodation"
  _createdAt: string
  _updatedAt: string
  _rev: string
  travelHeading?: string
  travelDetails?: TextBlock
  accommodationHeading?: string
  accommodationDetails?: TextBlock
}

export type Theme = {
  _id: string
  _type: "theme"
  _createdAt: string
  _updatedAt: string
  _rev: string
  name: string
  palette?: {
    common?: {
      black: HexColorPicker
      white: HexColorPicker
    }
    primary?: {
      main: HexColorPicker
      light?: HexColorPicker
      dark?: HexColorPicker
      contrastText?: HexColorPicker
    }
    secondary?: {
      main: HexColorPicker
      light?: HexColorPicker
      dark?: HexColorPicker
      contrastText?: HexColorPicker
    }
    error?: {
      main: HexColorPicker
      light?: HexColorPicker
      dark?: HexColorPicker
      contrastText?: HexColorPicker
    }
    warning?: {
      main: HexColorPicker
      light?: HexColorPicker
      dark?: HexColorPicker
      contrastText?: HexColorPicker
    }
    info?: {
      main: HexColorPicker
      light?: HexColorPicker
      dark?: HexColorPicker
      contrastText?: HexColorPicker
    }
    success?: {
      main: HexColorPicker
      light?: HexColorPicker
      dark?: HexColorPicker
      contrastText?: HexColorPicker
    }
  }
}

export type Settings = {
  _id: string
  _type: "settings"
  _createdAt: string
  _updatedAt: string
  _rev: string
  card?: {
    backgroundColor?: HexColorPicker
  }
  background?: {
    image?: {
      asset?: {
        _ref: string
        _type: "reference"
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset"
      }
      hotspot?: SanityImageHotspot
      crop?: SanityImageCrop
      _type: "image"
    }
    color?: HexColorPicker
  }
  pageNames?: {
    home?: string
    schedule?: string
    travel?: string
    rsvp?: string
    faq?: string
    registry?: string
  }
  images?: {
    ogImage?: {
      asset?: {
        _ref: string
        _type: "reference"
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset"
      }
      hotspot?: SanityImageHotspot
      crop?: SanityImageCrop
      _type: "image"
    }
    thankYou?: {
      asset?: {
        _ref: string
        _type: "reference"
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset"
      }
      hotspot?: SanityImageHotspot
      crop?: SanityImageCrop
      _type: "image"
    }
  }
}

export type Schedule = {
  _id: string
  _type: "schedule"
  _createdAt: string
  _updatedAt: string
  _rev: string
  time?: string
  ceremony?: boolean
  heading?: string
  details?: TextBlock
  icon?: IconPicker
}

export type SaveDate = {
  _id: string
  _type: "saveDate"
  _createdAt: string
  _updatedAt: string
  _rev: string
  heading?: StringObjectField
  context?: TextBlock
  extraInfo?: StringObjectField
  backgroundImage?: {
    asset?: {
      _ref: string
      _type: "reference"
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset"
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: "image"
  }
}

export type StringObjectField = {
  _type: "stringObjectField"
  string?: string
  typographyVariant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body1"
    | "body2"
    | "button"
    | "caption"
    | "inherit"
    | "overline"
    | "subtitle1"
    | "subtitle2"
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | "textPrimary"
    | "textSecondary"
    | "textDisabled"
}

export type Registry = {
  _id: string
  _type: "registry"
  _createdAt: string
  _updatedAt: string
  _rev: string
  registryHeading?: string
  registryDetails?: TextBlock
  qrCode?: {
    asset?: {
      _ref: string
      _type: "reference"
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset"
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: "image"
  }
  registryLink?: string
}

export type Home = {
  _id: string
  _type: "home"
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  distanceMessages?: {
    upcoming?: string
    past?: string
  }
  location?: TextBlock
  image?: {
    asset?: {
      _ref: string
      _type: "reference"
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset"
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: "image"
  }
}

export type SanityImageCrop = {
  _type: "sanity.imageCrop"
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot"
  x?: number
  y?: number
  height?: number
  width?: number
}

export type SanityImageAsset = {
  _id: string
  _type: "sanity.imageAsset"
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  metadata?: SanityImageMetadata
  source?: SanityAssetSourceData
}

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData"
  name?: string
  id?: string
  url?: string
}

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata"
  location?: Geopoint
  dimensions?: SanityImageDimensions
  palette?: SanityImagePalette
  lqip?: string
  blurHash?: string
  hasAlpha?: boolean
  isOpaque?: boolean
}

export type Faq = {
  _id: string
  _type: "faq"
  _createdAt: string
  _updatedAt: string
  _rev: string
  position?: number
  question?: string
  answer?: string
  icon?: IconPicker
}

export type IconPicker = {
  _type: "iconPicker"
  provider?: string
  name?: string
  svg?: string
}

export type AllSanitySchemaTypes =
  | SanityImagePaletteSwatch
  | SanityImagePalette
  | SanityImageDimensions
  | SanityFileAsset
  | Geopoint
  | Slug
  | TextBlock
  | HexColorPicker
  | Wedding
  | TravelAccommodation
  | Theme
  | Settings
  | Schedule
  | SaveDate
  | StringObjectField
  | Registry
  | Home
  | SanityImageCrop
  | SanityImageHotspot
  | SanityImageAsset
  | SanityAssetSourceData
  | SanityImageMetadata
  | Faq
  | IconPicker
export declare const internalGroqTypeReferenceTo: unique symbol
