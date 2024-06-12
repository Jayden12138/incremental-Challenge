// DeepCamelize
// { aa_bb: { cc_dd: { ee_ff: string } } } => { aaBb: { ccDd: { eeFf: string } } }

type Camelize<Str extends string> = Str extends `${infer F}_${infer Rest}`
	? Camelize<`${F}${Capitalize<Rest>}`>
	: Str

type DeepCamelize<T> = T extends unknown[]
	? CamelizeArr<T>
	: T extends Record<string, any>
	? {
			[K in keyof T as Camelize<K & string>]: DeepCamelize<T[K]>
	  }
	: T

type CamelizeArr<T> = T extends [infer F, ...infer Rest]
	? [DeepCamelize<F>, ...CamelizeArr<Rest>]
	: []

// usage
type DeepCamelizeRes = DeepCamelize<{
	aa_bb: string
	bb_cc: [{ cc_dd: string }, { dd_ee: string; ee_ff: { ff_gg: string } }]
}>
