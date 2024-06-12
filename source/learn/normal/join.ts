// join
// join('-')('java', 'and', 'javascript')

declare function join<Delimiter extends string>(
	delimiter: Delimiter
): <Items extends string[]>(...args: Items) => JoinType<Items, Delimiter>

type JoinType<
	Items extends unknown[],
	Delimiter extends string,
	Res extends string = ''
> = Items extends [infer F, ...infer Rest]
	? JoinType<Rest, Delimiter, `${Res}${Delimiter}${F & string}`>
	: RemoveLastDelimiter<Res, Delimiter>

type RemoveLastDelimiter<
	T extends string,
	Delimiter extends string
> = T extends `${Delimiter}${infer Rest}` ? Rest : T

// usage
const res = join('-')('java', 'and', 'javascript')
