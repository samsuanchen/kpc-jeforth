// 	Javascript Easy Forth		2012/2/16
//	yapcheahshen@gmail.com, samsuanchen@gmail.com
(function() { 							// Main
  'uses strict'	 						// check all undefined names
  function KsanaVm(dictsize) { 			// private members for KsanaVM 
	var dictsize = dictsize||0x1000, ip=0, here=0
	var abortexec=false, compiling=false
	var dictionary = new Array(dictsize)
	var stack = [], rstack =[], tib="", ntib=0 
	this.ticktype = 0					// import from HTML
  function systemtype(t) {
  	if (this.ticktype) this.ticktype(t) 
  }
  function cr() { systemtype.apply(this,["\n"]) }
  function panic(msg) { systemtype.apply(this,[msg]); reset() }
  function nexttoken() { 
	var token=""; while (tib[ntib]==' ') ntib++	// leading spaces
	while (ntib<tib.length && tib[ntib]!=' ') token += tib[ntib++]
	return token; }
  function dictcompile(n) { dictionary[here++]=n }	// primitive compiler
  function reset() { abortexec=1; stack=[]; rstack=[] }
  function findword(name) { 
	for (var i=words.length-1;i>0;i--) if (words[i].name==name) break
	return i }
  function compilecode(id) { if ( typeof(id) ==="string" ) id=findword(id)
	dictcompile(id); }
  function execute(xt) { if (typeof(xt)==="function") xt.call(this); else call.apply(this,[xt]) }
  function call(address) { abortexec=false, ip=address// inner interpreter
	do{ id=dictionary[ip++]; var x=words[id].xt 
		if (typeof(x)==='function') x()
		else { if(words[dictionary[ip]].name!='ret') rstack.push(ip)
			ip=x } }
	while (!abortexec) }
  function exec(cmds) { tib=cmds, ntib=0// outer interpreter
	do{ var token=nexttoken() 			// get token
		if (token==="") break 			// break if end of line 
		var n=parseInt(token) 			// parse integer
		var id=findword(token)	 		// search word
		if (id) { var w=words[id] 		// get word
			if (compiling && !w.immediate) compilecode(id) 
			else execute.apply(this,[w.xt]); }		// process word
		else if (n) { if (compiling) 	// get number
          	      	  { compilecode("dolit"); dictcompile(n) }
					  else stack.push(n) }	// process number
		else panic("? "+token) }		// error
	while (true); cr() }				// repeat
  var words = [ 0
    ,{ name:"dolit",xt:function(){stack.push(dictionary[ip++])} }
    ,{ name:"ret",	xt:function(){if(rstack.length===0){abortexec=true; return}
		ip=rstack.pop()} }
    ,{ name:":",	xt:function(){newname=nexttoken();newxt=here
		compiling=true} }
    ,{ name:";",	xt:function(){compiling=false; compilecode("ret")
		words.push({name:newname,xt:newxt})}, immediate: true }
    ,{ name:"*",	xt:function(){stack.push( stack.pop()*stack.pop() )} }
    ,{ name:".",	xt:function(){systemtype.apply(this,[stack.pop()+" "]) }}
    ,{ name:"dup",	xt:function(){stack.push(stack[stack.length-1])} }
    ,{ name:"drop", xt:function(){stack.pop()} }
  ]
  this.exec=exec } 					// export outer interpreter
window.KsanaVm=KsanaVm;					// export KsanaVM
  module.exports=KsanaVm;
} ) (); 								// execute Main