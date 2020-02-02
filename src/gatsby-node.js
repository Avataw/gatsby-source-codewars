const fetch = require('node-fetch');

exports.sourceNodes = async (
    { actions, createNodeId, createContentDigest },
    pluginOptions) => {

    const { createNode } = actions;

    const apiUrl = (`https://www.codewars.com/api/v1/users/${pluginOptions.userName}/code-challenges/completed`);

    return (
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                data.data.forEach(challenge => {
                    const nodeMeta = {
                        id: createNodeId(`codewars-challenge-${challenge.id}`),
                        parent: null,
                        children: [],
                        internal: {
                            type: "Challenge",
                            content: JSON.stringify(challenge),
                            contentDigest: createContentDigest(challenge)
                        }
                    };
                    const node = Object.assign({}, challenge, nodeMeta);
                    createNode(node);
                })
            })
    )
};

const Challenge = {};