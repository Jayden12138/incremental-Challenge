// Defaultize
// 只有a有的不变 ab都用变可选 只有b有的变可选
// type A = {aa: string; bb: string} type B = {bb: string; cc: string} => {aa: string; bb?: string; cc?: string}
type A = { aa: string; bb: string }
type B = { bb: string; cc: string }

type Defaultize<A, B> = Omit<A, keyof B> & Partial<B>

// 2
// type Defaultize<A, B> = Pick<A, Exclude<keyof A, keyof B>> & Partial<B>

type Copy<T extends Record<string, any>> = {
	[K in keyof T]: T[K]
}

// usage
type DefaultizeRes = Copy<Defaultize<A, B>>
