// AllKeyPath
// {a: {b: {b1: string;b2: string}c: {c1: string;c2: string}}} => 'a' | 'a.b' | 'a.b.b1' | ...

type AllKeyPath<T extends Record<string, any>> = {
	[K in keyof T]: K extends string
		? T[K] extends Record<string, any>
			? T[K] extends unknown[]
				? K
				: K | `${K}.${AllKeyPath<T[K]>}`
			: K
		: never
}[keyof T]

type AllKeyPathRes = AllKeyPath<{
	a: {
		b: { b1: string; b2: string }
		c: { c1: string; c2: string }
		d: [1, 2, 3]
	}
}>
