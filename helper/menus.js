const configQuestions = [
    {
        type: 'input',
        name: 'server',
        message: "Server Address:"
    },
    {
        type: 'input',
        name: 'token',
        message: "Your CLI Token:"
    },
    {
        type: 'input',
        name: 'product_key',
        message: "Hasher Group Key:"
    }
]
const newCampiganQuestions = [
    {
        message: "Choose the Attack Mode:",
        type: 'list',
        choices: ['Straight (0)', 'Combination (1)', 'Brute-force (3)', 'Hybrid Wordlist + Mask (6)', 'Hybrid Mask + Wordlist (7)'],
        name: 'attack-mode'
    },
    {
        message: "Choose the Instance Type:",
        type: 'list',
        choices: [],
        name: 'instance-type'
    },
    {
        message: "Path to the hash file:",
        type: 'text',
        name: 'hash-file-key'
    },
    {
        message: "Which algorithm to set: (Hash-Mode of Hashcat)",
        type: 'text',
        name: 'hash-type'
    },
    {
        message: "Choose a wordlist:",
        type: 'list',
        choices: [],
        name: 'wordlist',
        when: ((value) =>
            value['attack-mode'] == 'Straight (0)' ||
            value['attack-mode'] == 'Combination (1)' ||
            value['attack-mode'] == 'Hybrid Wordlist + Mask (6)' ||
            value['attack-mode'] == 'Hybrid Mask + Wordlist (7)'
        )
    },
    {
        message: "Choose a rule file:",
        type: 'checkbox',
        choices: ["d3ad0ne.rule", "OneRuleToRuleThemAll.rule", "generated2.rule"],
        name: 'rules',
        when: ((value) =>
            value['attack-mode'] == 'Straight (0)' ||
            value['attack-mode'] == 'Hybrid Wordlist + Mask (6)' ||
            value['attack-mode'] == 'Hybrid Mask + Wordlist (7)'
        )
    },
    {
        message: "Choose an attack mask:",
        type: 'text',
        name: 'mask',
        when: ((value) =>
            value['attack-mode'] == 'Brute-force (3)' ||
            value['attack-mode'] == 'Hybrid Wordlist + Mask (6)' ||
            value['attack-mode'] == 'Hybrid Mask + Wordlist (7)'
        )
    },
    {
        message: "Give a name to your campigan:",
        type: 'text',
        name: 'name'
    },
]

module.exports = {
    configQuestions,
    newCampiganQuestions
}