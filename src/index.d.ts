interface DisallowedToken {
	type: 'disallowed';
	cp: number;
}
interface IgnoredToken {
	type: 'ignored';
	cp: number;
}
interface ValidToken {
	type: 'valid';
	cps: number[];
}
interface IsolatedToken {
	type: 'isolated';
	cp: number;
}
interface MappedToken {
	type: 'mapped';	
	cp: number;
	cps: number[];
}
type TextToken = DisallowedToken | IgnoredToken | ValidToken | IsolatedToken | MappedToken;
interface EmojiToken {
	type: 'emoji';
	input: number[];
	emoji: number[];
	cps: number[];
}
interface NFCToken {
	type: 'nfc';
	input: number[];
	cps: number[];
	tokens: TextToken[]; 
}
interface StopToken {
	type: 'stop';
}
type Token = TextToken | EmojiToken | NFCToken | StopToken;

export default interface ENSNormalize {
	hash(name: string): string;
	normhash(name: string): string;
	labelhash(label: string): string;

	normalize(name: string): string;
	beautify(name: string): string;
	tokenize(name: string): Token[];
	getEmoji(): number[][];

	normalizeFragment(frag: string): string;
	normalizeFragmentPostCheck(norm: string): string;
	
	nfd(cps: number[]): number[];
	nfc(cps: number[]): number[];
};
