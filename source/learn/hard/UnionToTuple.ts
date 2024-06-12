// UnionToTuple
// 'a' | 'b' | 'c' => ['a', 'b', 'c']

// 联合类型 转 交叉类型
// 分布式条件类型 函数逆变
type UnionToIntersection<U> = (U extends any ? (x: U) => any : never) extends (
	x: infer R
) => any
	? R
	: never

type UnionToTuple<T> = UnionToIntersection<
	T extends any ? () => T : never
> extends () => infer R
	? [...UnionToTuple<Exclude<T, R>>, R]
	: []

type UnionToTupleRes = UnionToTuple<'a' | 'b' | 'c'>
