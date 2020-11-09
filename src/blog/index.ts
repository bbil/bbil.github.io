import { getBlogDetails, getBlogTitles } from './repository'
export type { BlogData } from './repository'

export default {
    getDetails: getBlogDetails,
    getTitles: getBlogTitles,
}
