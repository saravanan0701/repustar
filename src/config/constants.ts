type tTagTypeMapping = {
    [key: string]: string
}

export const tagTypeMapping : tTagTypeMapping = {
    tag_people: 'Person',
    tag_location: 'Place',
    tag_org: 'Organization',
    category: 'Subject',
    topic: 'Topic'
}

export const tagsColumns: number = 4;