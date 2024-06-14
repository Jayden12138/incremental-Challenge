// zip
// [1, 2, 3] [4, 5, 6] => [[1, 4], [2, 5], [3, 6]]

type ZipType<A, B, Res extends unknown[] = []> = A extends [
	infer F,
	...infer Rest
]
	? B extends [infer G, ...infer Rest2]
		? ZipType<Rest, Rest2, [...Res, [F, G]]>
		: never
	: Res

function zip<A extends unknown[], B extends unknown[]>(
	arr1: A,
	arr2: B
): ZipType<A, B>

function zip(arr1, arr2) {
	return arr1.map((item, index) => {
		return [item, arr2[index]]
	})
}

let zipRes = zip([1, 2, 3] as const, [4, 5, 6] as const)
