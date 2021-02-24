class PrefixTreeNode {
    constructor(value) {
        this.children = {};
        this.isEnd = null;
        this.value = value;
    }
}

class Trie extends PrefixTreeNode {
    constructor() {
        super(null);
    }

    addWord(strParam) {
        const addWordHelper = (node, str) => {
            if (!node.children[str[0]]) {
                node.children[str[0]] = new PrefixTreeNode(str[0]);

                if (str.length === 1) {
                    node.children[str[0]].isEnd = true;
                } else if (str.length > 1) {
                    addWordHelper(node.children[str[0]], str.slice(1));
                }
            }
        }

        addWordHelper(this, strParam);
    }

    predictWord(strParam) {
        let getRemainingTree = function(str, tree) {
            let node = tree;
            while(str) {
                node = node.children[str[0]];
                str = str.substr(1);
            }
            
            return node;
        };

        let allWords = [];
        let allWordsHelper = function(strSoFar, tree) {
            for (const key in tree.children) {
               let child = tree.children[key];
               let newStr = strSoFar + child.value;
               if (child.isEnd) {
                   allWords.push(newStr);
               }

               allWordsHelper(newStr, child);
            }
        };

        let remainingTree = getRemainingTree(strParam, this);
        if (remainingTree) {
            allWordsHelper(str, remainingTree);
        }

        return allWords;
    }
}