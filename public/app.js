document.addEventListener('click', ({ target }) => {
  if (target.dataset.type === 'remove') {
    const id = target.dataset.id

    remove(id).then(() => {
      target.closest('li').remove()
    })
  }
})

async function remove(id) {
  await fetch('/' + id, {
    method: 'DELETE',
  })
}
