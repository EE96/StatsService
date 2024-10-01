export type Session = {
    sessionId: string
    courseId: string
    userId: string
    totalModulesStudied: number
    averageScore: number
    timeStudied: number
}

export type SessionKey = {
    sessionId: string
    courseId: string
    userId: string
}

export type SessionDbItem = {
    hashKey: string
    sortKey: string
    totalModulesStudied: number
    averageScore: number
    timeStudied: number
}

export type SessionDbItemKey = {
    hashKey: string
    sortKey: string
}

export type AggregatedLifetimeSessions = {
    totalModulesStudied: number
    averageScore: number
    timeStudied: number
}