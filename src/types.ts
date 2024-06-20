export interface Site {
    title: string
    author: string
    url: string
    description: string
    shortDescription: string
}

export interface NavigationLink {
    name: string
    url: string
}

export interface PickUpPost {
    title: string
    slug: string
}

export interface Social {
    twitter?: string
    blog?: string
    github?: string
}

export interface User {
    avatar: string
    name: string
    title: string
    description: string
    social: Social
}

export interface Image {
    /**
     * public url of the image
     */
    src: string
    /**
     * image width
     */
    width: number
    /**
     * image height
     */
    height: number
    /**
     * blurDataURL of the image
     */
    blurDataURL: string
    /**
     * blur image width
     */
    blurWidth: number
    /**
     * blur image height
     */
    blurHeight: number
}
