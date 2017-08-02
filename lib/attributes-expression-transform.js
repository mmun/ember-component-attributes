/*
  ```hbs
  {{my-component (attributes data-foo="bar" class="cat" id="dog")}}
  ```

  becomes

  ```hbs
  {{my-component class="cat id="dog" __HTML_ATTRIBUTES__=(hash data-foo="bar") }}
  ```
*/

function AttributesExpressionTransform() {
  this.syntax = null;
}

AttributesExpressionTransform.prototype.transform = function(ast) {
  var b = this.syntax.builders;

  this.syntax.traverse(ast, {
    MustacheStatement(node) {
      transform(node);
    },
    BlockStatement(node) {
      transform(node);
    }
  });

  function transform(curly) {
    if (hasAttributesExpression(curly)) {
      let attributes = curly.params.pop();

      let pairs = attributes.hash.pairs;
      let newPairs = [];

      for (let i = 0; i < pairs.length; i++) {
        let pair = pairs[i];
        if (pair.key === "class") {
          curly.hash.pairs.push(b.pair("class", pair.value));
        } else if (pair.key === "id") {
          curly.hash.pairs.push(b.pair("id", pair.value));
        } else {
          newPairs.push(pair);
        }
      }

      if (newPairs.length > 0) {
        attributes.path = b.path("hash");
        attributes.hash.pairs = newPairs;
        curly.hash.pairs.push(b.pair("__HTML_ATTRIBUTES__", attributes));
      }
    }
  }

  function hasAttributesExpression(curly) {
    if (curly.params.length > 0) {
      let last = curly.params[curly.params.length - 1];
      if (last.type === "SubExpression" && last.path.original === "attributes") {
        return true;
      }
    }
  }

  return ast;
};

module.exports = AttributesExpressionTransform;
