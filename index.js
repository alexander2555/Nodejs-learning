const yargs = require('yargs')
const { addNote, getNotes, removeNote } = require('./notes.controller')

yargs
  .command({
    command: 'add',
    describe: 'Add note with TITLE',
    builder: {
      title: {
        type: 'string',
        describe: 'Note title',
        demandOption: true,
      },
    },
    async handler({ title }) {
      await addNote(title)
    },
  })
  .command({
    command: 'list',
    describe: 'Print notes list',
    async handler() {
      const notes = await getNotes()
      console.log('Here is the list of notes:')
      console.table(notes, ['id', 'title'])
    },
  })
  .command({
    command: 'remove',
    describe: 'Remove note by ID',
    builder: {
      id: {
        type: 'string',
        describe: 'Note ID',
        demandOption: true,
      },
    },
    async handler({ id }) {
      await removeNote(id)
    },
  })
  .parse()
