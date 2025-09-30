const yargs = require('yargs')
const { addNote, getNotes } = require('./notes.controller')

yargs.command(
  {
  command: 'add',
  describe: 'Add list el',
  builder: {
    title: {
      type: 'string',
      describe: 'Note title',
      demandOption: true
    }
  },
  async handler({ title }) {
    await addNote(title)
  }
}).command(
  {
    command: 'list',
    describe: 'Print list',
    async handler() {
      const notes = await getNotes()
      console.log(notes)
    }
  }
).parse()
