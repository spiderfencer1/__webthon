'use strict'

const language_def =
{
	'keywords':
	[
		'False',
		'class',
		'finally',
		'is',
		'return',
		'None',
		'continue',
		'for',
		'lambda',
		'try',
		'True',
		'def',
		'from',
		'nonlocal',
		'while',
		'and',
		'del',
		'global',
		'not',
		'with',
		'as',
		'elif',
		'if',
		'or',
		'yield',
		'assert',
		'else',
		'import',
		'pass',
		'break',
		'except',
		'in',
		'raise',
	],
	'builtins':
	[
		'abs',
		'divmod',
		'input',
		'open',
		'staticmethod',
		'all',
		'enumerate',
		'int',
		'ord',
		'str',
		'any',
		'eval',
		'isinstance',
		'pow',
		'sum',
		'basestring',
		'execfile',
		'issubclass',
		'print',
		'super',
		'bin',
		'file',
		'iter',
		'property',
		'tuple',
		'bool',
		'filter',
		'len',
		'range',
		'type',
		'bytearray',
		'float',
		'list',
		'raw_input',
		'unichr',
		'callable',
		'format',
		'locals',
		'reduce',
		'unicode',
		'chr',
		'frozenset',
		'long',
		'reload',
		'vars',
		'classmethod',
		'getattr',
		'map',
		'repr',
		'xrange',
		'cmp',
		'globals',
		'max',
		'reversed',
		'zip',
		'compile',
		'hasattr',
		'memoryview',
		'round',
		'__import__',
		'complex',
		'hash',
		'min',
		'set',
		'delattr',
		'help',
		'next',
		'setattr',	
		'dict',
		'hex',
		'object',
		'slice',	
		'dir',
		'id',
		'oct',
		'sorted'
	],
	'tokens':
	[
		'<>','==','<=','>=','<','>',':','+=','-=','*=','/=','+','-','*','/'
	]
};

function token(type,lexeme) { return {'type':type,'lexeme':lexeme}; }

function tokenize(buffer)
{
	const tokens = new Array();
	for(let i=0;i<buffer.length;i++)
	{
		for(let kw of language_def.keywords)
		{
			if(buffer.substring(i,i+kw.length) == kw)
			{
				i += kw.length - 1;
				tokens.push(token('keyword',kw));	
				break;
			}
		};
		for(let bt of language_def.builtins)
		{
			if(buffer.substring(i,i+bt.length) == bt)
			{
				i += bt.length - 1;
				tokens.push(token('builtin',bt));
				break;
			}
		}
		for(let tk of language_def.tokens)
		{
			if(buffer.substring(i,i+tk.length) == tk)
			{
				i += tk.length - 1;
				tokens.push(token('token',tk));
				break;
			}
		}
		if('0123456798'.includes(buffer[i]))
		{
			let num = '';
			while('012345679'.includes(buffer[i])) { num += buffer[i++]; }
			i--;
			tokens.push(token('num',num));
		}
		else if(buffer[i] == '\'' || buffer[i] == '"')
		{
			const end = buffer[i++];
			let str = '';
			while(buffer[i] != end) { str += buffer[i++]; }
			tokens.push(token('str',str));
		}
		else if(buffer[i].toLowerCase() != buffer[i].toUpperCase() || buffer[i] == '_')
		{
			let wrd = '';
			while(buffer[i].toLowerCase() != buffer[i].toUpperCase() || buffer[i] == '_') { wrd += buffer[i++]; }
			i--;
			tokens.push(token('wrd',wrd));
		}
	}
	return tokens;
}

class Keyword
{
	constructor(name,args)
	{
		this.name = name;
		this.args = args;
	}
	eval()
	{	
		return 0;
	}
};

class Builtin
{
	constructor(name,args)
	{
		this.name = name;
		this.args = args;
	}
	eval()
	{	
		return 0;
	}
}

class Atom
{
	constructor(value)
	{
		this.value = value;	
	}
	eval()
	{	
		return this.value;
	}
}

class Expr
{
	constructor(left,right,op)
	{
		this.left = left;
		this.right = right;
		this.op = op;
	}
	eval()
	{
		switch(op)
		{
			case '+':
				return this.left.value() + this.right.value();
			case '-':
				return this.left.value() - this.right.value();
			case '*':
				return this.left.value() * this.right.value();
			case '/':
				return this.left.value() / this.right.value();
		}
	}
}

function parse(tokens)
{
	const ast = new Array();
	for(let i=0;i<tokens.length;i++)
	{
			
	}	
}
