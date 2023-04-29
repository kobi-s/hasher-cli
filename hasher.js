const { program } = require("commander");
const { prompt } = require('inquirer');
const { setConfig } = require("./config");
const menu = require("./helper/menus");
const { startNewCampigan, getCampigans, getNewCampiganHelpers, deleteCampigan, getCampaiganHarvest, cancelCampaigan } = require("./functions/campigan");
const handleError = require("./helper/errorHandler");

program.version(require('./package.json').version)
program.description('Ha$h3r CLI - Distributed Hash Cracking Tool')

program.command('new')
    .description('Start new campigan')
    .action(async() => {

        try {
            const response = await getNewCampiganHelpers()
            const wordlists = response.data.data.wordlists;
            const rules =  response.data.data.rules;
            const instanceTypes =  response.data.data.instanceTypes;
    
            let questions = menu.newCampiganQuestions;
            let wordlistIndex = questions.findIndex(q => q.name == 'wordlist')
            let rulesIndex = questions.findIndex(q => q.name == 'rules')
            let instanceTypesInex = questions.findIndex(q => q.name == 'instance-type')
            
            questions[wordlistIndex].choices = wordlists.map(a => a.filename)
            questions[rulesIndex].choices = rules.map(a => a.filename)
            questions[instanceTypesInex].choices = instanceTypes.map(a => a.name)
            
            prompt(questions)
            .then(answers => startNewCampigan(answers))   
        } catch (error) {
            handleError(error)
        }
    })

program.command('list')
    .description('Get a list of your campaigns')
    .action(()=> {getCampigans()})

program.command('harvest')
    .argument('<id>')
    .description('Harvest your campaign')
    .action((id)=> {
        getCampaiganHarvest(id);
    })

program.command('stop')
    .argument('<id>')
    .description('Stop an active campaign')
    .action((id)=> {
        cancelCampaigan(id);
    })

// program.command('delete')
//     .argument('<id>')
//     .description('Delete campaign by id')
//     .action((id)=> {
//         deleteCampigan(id);
//     })

program.command('config')
    .description('Config your Ha$h3r account')
    .action(() => {
        prompt(menu.configQuestions).then(answers => setConfig(answers))
    })


program.parse()

