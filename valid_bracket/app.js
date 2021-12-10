const openers = ["{", "[", "("];
const closers = ["}", "]", ")"];
const match = {
  "}": "{",
  "]": "[",
  ")": "("
};
function myFunction(arg) {
  console.log(`"${arg}"`);
  var lastOpener = [];

  for (c in arg) {
    if (openers.includes(arg[c])) {
      lastOpener.push(arg[c]);
    }
    if (closers.includes(arg[c])) {
      const last = lastOpener.pop();
      if (last !== match[arg[c]]) {
        return false;
      }
    }
  }
  return lastOpener.length == 0; // Should be fine here :)
}

// // run your function through some test cases here
// // remember: debugging is half the battle!
function test(actual, expected) {
   console.log("actual", actual, "expected", expected);
}
test(myFunction(""), true);
test(myFunction("{{{}}}"), true);
test(myFunction("{{{}}}]"), false);
test(myFunction("{"), false);
test(myFunction("}"), false);
test(myFunction("{ [ ] () { [ ] } }"), true);
test(myFunction("{ [ ] ( { [ ] } ( ) ) }"), true);
// test(myFunction("{ [ () ] ( ) }"), true);
// test(myFunction("{ [ ( ] ) ( ) }"), false);
// test(myFunction("{ [ ] ( ) }"), true);
// test(myFunction("{ [ ( ] ) }"), false);
// test(myFunction("{ [ }"), false);
