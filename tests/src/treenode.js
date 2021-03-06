/*
Inject
Copyright 2011 LinkedIn

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an "AS
IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
express or implied.   See the License for the specific language
governing permissions and limitations under the License.
*/

var sandbox;
module("src :: TreeNode", {
  setup: function() {
    sandbox = new Sandbox(false);
    loadDependencies(sandbox, [
      "/src/lib/class.js",
      "/src/treenode.js"
    ]);
  },
  teardown: function() {
    sandbox = null;
  }
});

function buildSampleTree() {
  /*
      root
      /   \
     A     B___
    / \   / \  \
   C   D E   F  G
   |  /     / \  \
   H I     J  K   L
  */
  function tn(val) {
    var context = sandbox.global;
    var n = new context.global.TreeNode(val);
    return n;
  }
  var root = tn("root");
  var a = tn("a");
  var b = tn("b");
  var c = tn("c");
  var d = tn("d");
  var e = tn("e");
  var f = tn("f");
  var g = tn("g");
  var h = tn("h");
  var i = tn("i");
  var j = tn("j");
  var k = tn("k");
  var l = tn("l");

  root.addChild(a);
  root.addChild(b);

  a.addChild(c);
  a.addChild(d);

  b.addChild(e);
  b.addChild(f);
  b.addChild(g);

  c.addChild(h);

  d.addChild(i);

  f.addChild(j);
  f.addChild(k);

  g.addChild(l);

  /*
      root
      /   \
     A     B___
    / \   / \  \
   C   D E   F  G
   |  /     / \  \
   H I     J  K   L
  */
  return {
    tree: root,
    postOrder: ["h", "c", "i", "d", "a", "e", "j", "k", "f", "l", "g", "b", "root"]
  }
}

test("Scaffolding", function() {
  var context = sandbox.global;
  ok(typeof(context.TreeNode) !== "undefined", "object exists");
});

test("Tree Walk", function() {
  var setupData = buildSampleTree();
  var output = [];

  setupData.tree.postOrder(function(node) {
    output.push(node.getValue());
  });
  deepEqual(output, setupData.postOrder, "postOrder traversal");
});