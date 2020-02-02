const axios = require("axios");

const NODE_TYPE = `CodewarsChallenges`;

exports.sourceNodes = async function sourceNodes(
    { actions, createContentDigest, createNodeId },
    pluginOptions
) {
    const { createNode } = actions;

    const { completedChallenges } = await axios.get(
        `https://www.codewars.com/api/v1/users/${pluginOptions.userName}/code-challenges/completed`
    );

    completedChallenges.items.forEach(challenge => {
        const nodeMetadata = {
            id: createNodeId(`codewars-${challenge.uuid}`),
            parent: null,
            children: [],
            internal: {
                type: NODE_TYPE,
                content: JSON.stringify(challenge),
                contentDigest: createContentDigest(challenge),
            },
        };

        const node = Object.assign({}, challenge, nodeMetadata);
        createNode(node);
    })
};