// ParseQueryString
// 'a=1&b=2&c=3' => {a: 1, b: 2, c: 3}

type MergeValue<T, U> = T extends U
	? T
	: U extends unknown[]
	? [T, ...U]
	: [T, U]

type Merge<T extends Record<string, any>, U extends Record<string, any>> = {
	[K in keyof T | keyof U]: K extends keyof T
		? K extends keyof U
			? MergeValue<T[K], U[K]> // mergeValue
			: T[K]
		: K extends keyof U
		? U[K]
		: never
}

type ParseStr<Str extends string> = Str extends `${infer Key}=${infer Value}`
	? { [K in Key]: Value }
	: Record<string, any>

type ParseQueryString<Str extends string> =
	Str extends `${infer A}&${infer Rest}`
		? Merge<ParseStr<A>, ParseQueryString<Rest>>
		: ParseStr<Str>

function ParseQueryString<Str extends string>(
	queryStr: Str
): ParseQueryString<Str>
function ParseQueryString(queryStr: string): Record<string, any> {
	const queryObj = {} as Record<string, any>
	const params = new URLSearchParams(queryStr)
	params.forEach((k, v) => {
		let key = decodeURIComponent(k).toLowerCase()
		let value = decodeURIComponent(v)

		if (queryObj[key]) {
			if (Array.isArray(queryObj[key])) {
				queryObj[key].push(value)
			} else {
				queryObj[key] = [queryObj[key], value]
			}
		} else {
			queryObj[key] = value
		}
	})

	return queryObj
}

const res = ParseQueryString('a=1&b=2&c=3')
