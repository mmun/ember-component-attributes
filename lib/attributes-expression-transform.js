/*
  ```hbs
  {{my-component (attributes aria-role="button")}}
  ```

  becomes

  ```hbs
  {{my-component __HTML_ATTRIBUTES__=(hash aria-role="button")}}
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

  function transform(node) {
    if (hasAttributesExpression(node)) {
      let attributes = node.params.pop();

      attributes.path = b.path("hash");

      node.hash.pairs.push(b.pair("__HTML_ATTRIBUTES__", attributes));
    }
  }

  function hasAttributesExpression(node) {
    if (node.params.length > 0) {
      let last = node.params[node.params.length - 1];
      if (last.type === "SubExpression" && last.path.original === "attributes") {
        return true;
      }
    }
  }
};

module.exports = AttributesExpressionTransform;
