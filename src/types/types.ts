export interface Author {
    name: string
    birth_year: number
    death_year: number
}

export interface BookMetadata {
    authors: Author[]
    bookshelves: any[] // The actual content type could vary; define accordingly if needed
    copyright: boolean
    download_count: number
    formats: {
        [key: string]: string // Format type (key) to URL (value) mapping
    }
    id: number
    languages: string[]
    media_type: string
    subjects: string[]
    title: string
    translators: any[] // The actual content type could vary; define accordingly if needed
}