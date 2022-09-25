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

export function hash(name: string): string;
export function normhash(name: string): string;
export function labelhash(label: string): string;

export function normalize(name: string): string;
export function beautify(name: string): string;
export function tokenize(name: string): Token[];
export function emojis(): number[][];

export function normalizeFragment(frag: string): string;
export function normalizePostCheck(norm: string): string;

export function nfd(cps: number[]): number[];
export function nfc(cps: number[]): number[];
